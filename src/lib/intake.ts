import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const MATTER_TYPES = [
  { value: "motorcycle-crash", label: "Motorcycle crash" },
  { value: "auto-crash", label: "Automobile collision" },
  { value: "roadway-defect", label: "Roadway defect / dangerous condition" },
  { value: "wrongful-death", label: "Wrongful death" },
  { value: "business", label: "Business counsel" },
  { value: "other", label: "Other" },
] as const;

const matterValues = MATTER_TYPES.map((m) => m.value) as [
  (typeof MATTER_TYPES)[number]["value"],
  ...(typeof MATTER_TYPES)[number]["value"][],
];

export const intakeSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z.string().trim().min(7, "Please enter a phone number").max(40),
  email: z.email("Please enter a valid email").max(120),
  city: z.string().trim().min(2, "Please enter your city").max(80),
  matterType: z.enum(matterValues),
  incidentDate: z.string().optional(),
  incidentCity: z.string().trim().max(80).optional(),
  injuries: z.string().trim().max(2000).optional(),
  description: z
    .string()
    .trim()
    .min(20, "Please describe what happened in a few sentences")
    .max(8000),
  consent: z.boolean().refine((v) => v === true, "Please confirm to continue"),
  advertising: z
    .boolean()
    .refine((v) => v === true, "Please acknowledge the notice"),
  website: z.string().max(200).optional(),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

export const intakeDefaults: IntakeInput = {
  name: "",
  phone: "",
  email: "",
  city: "",
  matterType: "motorcycle-crash",
  incidentDate: "",
  incidentCity: "",
  injuries: "",
  description: "",
  consent: false,
  advertising: false,
  website: "",
};

const STAFF_CC =
  "vassanti@assantilaw.com, mramos@assantilaw.com, aassanti@assantilaw.com";

export const submitIntake = createServerFn({ method: "POST" })
  .validator((data: unknown) => intakeSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) {
      return { ok: true as const };
    }

    const matter =
      MATTER_TYPES.find((m) => m.value === data.matterType)?.label ??
      data.matterType;

    const payload = {
      _subject: `Bike911 intake — ${matter} — ${data.city}`,
      _template: "table",
      _captcha: "false",
      _cc: STAFF_CC,
      _replyto: data.email,
      Name: data.name,
      Phone: data.phone,
      Email: data.email,
      City: data.city,
      "Matter type": matter,
      "Incident date": data.incidentDate || "Not provided",
      "Incident city": data.incidentCity || "Not provided",
      Injuries: data.injuries || "Not provided",
      Description: data.description,
      "Consent to contact": "Yes",
      "Acknowledged advertising notice": "Yes",
    };

    const response = await fetch(
      "https://formsubmit.co/ajax/info@assantilaw.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(
        "We could not send the intake just now. Please call 877-BIKE-911.",
      );
    }

    const result = (await response.json()) as { success?: string | boolean };
    if (result.success === false) {
      throw new Error(
        "We could not send the intake just now. Please call 877-BIKE-911.",
      );
    }

    return { ok: true as const };
  });
