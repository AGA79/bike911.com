import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FIRM } from "@/lib/firm";
import {
  MATTER_TYPES,
  intakeDefaults,
  intakeSchema,
  submitIntake,
  type IntakeInput,
} from "@/lib/intake";
import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Matter", "Review"] as const;

const STEP_SCHEMAS = [
  intakeSchema.pick({ name: true, phone: true, email: true, city: true }),
  intakeSchema.pick({
    matterType: true,
    incidentDate: true,
    incidentCity: true,
    injuries: true,
    description: true,
  }),
  intakeSchema.pick({ consent: true, advertising: true }),
];

function readFormData(): Partial<IntakeInput> {
  const formEl = document.getElementById("intake-form");
  const next: Partial<IntakeInput> = {};
  if (!(formEl instanceof HTMLFormElement)) return next;
  for (const [key, value] of new FormData(formEl).entries()) {
    if (
      key === "consent" ||
      key === "advertising" ||
      key === "website" ||
      typeof value !== "string"
    ) {
      continue;
    }
    (next as Record<string, string>)[key] = value;
  }
  return next;
}

export function IntakeForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [snapshot, setSnapshot] = useState<IntakeInput>(intakeDefaults);

  const form = useForm<IntakeInput>({
    resolver: zodResolver(intakeSchema),
    defaultValues: intakeDefaults,
    mode: "onTouched",
    shouldUnregister: false,
  });

  function mergeFromDom(): IntakeInput {
    const merged = { ...form.getValues(), ...readFormData() } as IntakeInput;
    setSnapshot(merged);
    return merged;
  }

  function goNext() {
    const merged = mergeFromDom();
    const parsed = STEP_SCHEMAS[step].safeParse(merged);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") {
          form.setError(path as keyof IntakeInput, { message: issue.message });
        }
      }
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function sendInquiry() {
    const payload: IntakeInput = {
      ...intakeDefaults,
      ...snapshot,
      ...readFormData(),
      consent:
        document.getElementById("consent")?.getAttribute("data-state") ===
        "checked",
      advertising:
        document.getElementById("advertising")?.getAttribute("data-state") ===
        "checked",
    };
    const parsed = intakeSchema.safeParse(payload);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") {
          form.setError(path as keyof IntakeInput, { message: issue.message });
        }
      }
      return;
    }
    setSending(true);
    try {
      await submitIntake({ data: parsed.data });
      setDone(true);
      toast.success("Inquiry received. Law firm staff will contact you shortly.");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : `We could not send the intake. Please call ${FIRM.phoneVanity}.`;
      toast.error(message);
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-panel p-8 sm:p-10">
        <p className="text-xs uppercase tracking-widest text-crimson">Received</p>
        <h2 className="mt-3 font-display text-3xl text-paper">
          Law firm staff stands ready to contact you upon inquiry.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Thank you. Your confidential intake is in our inbox. If this is
          urgent, call {FIRM.phoneVanity} now. We handle matters throughout
          California.
        </p>
        <a
          href={FIRM.phoneTel}
          className="mt-6 inline-flex min-h-11 items-center text-paper underline-offset-4 hover:underline"
        >
          {FIRM.phoneVanity}
          <span className="ml-2 text-muted">{FIRM.phoneNumeric}</span>
        </a>
      </div>
    );
  }

  const values = snapshot;
  const matterLabel =
    MATTER_TYPES.find((m) => m.value === values.matterType)?.label ??
    values.matterType;

  return (
    <form
      id="intake-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (step === STEPS.length - 1) void sendInquiry();
      }}
      className="rounded-xl border border-line bg-panel p-6 sm:p-8"
      noValidate
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-full h-0 w-0 opacity-0"
        {...form.register("website")}
      />

      <ol className="mb-8 flex gap-2" aria-label="Intake steps">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1">
            <p
              className={cn(
                "text-xs uppercase tracking-widest",
                i === step ? "text-paper" : "text-subtle",
              )}
            >
              {String(i + 1).padStart(2, "0")} {label}
            </p>
            <div
              className={cn("mt-2 h-px", i <= step ? "bg-crimson" : "bg-line")}
            />
          </li>
        ))}
      </ol>

      <div className={cn("grid gap-5 sm:grid-cols-2", step !== 0 && "hidden")}>
        <Field
          id="name"
          label="Full name"
          error={form.formState.errors.name?.message}
          className="sm:col-span-2"
        >
          <Input id="name" autoComplete="name" {...form.register("name")} />
        </Field>
        <Field id="phone" label="Phone" error={form.formState.errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" {...form.register("phone")} />
        </Field>
        <Field id="email" label="Email" error={form.formState.errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        </Field>
        <Field
          id="city"
          label="City in California"
          error={form.formState.errors.city?.message}
          className="sm:col-span-2"
        >
          <Input id="city" autoComplete="address-level2" {...form.register("city")} />
        </Field>
      </div>

      <div className={cn("grid gap-5 sm:grid-cols-2", step !== 1 && "hidden")}>
        <Field
          id="matterType"
          label="Matter type"
          error={form.formState.errors.matterType?.message}
          className="sm:col-span-2"
        >
          <select
            id="matterType"
            className="flex h-11 w-full rounded-md border border-line bg-elevated px-3 text-sm text-paper outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...form.register("matterType")}
          >
            {MATTER_TYPES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="incidentDate"
          label="Incident date"
          error={form.formState.errors.incidentDate?.message}
        >
          <Input id="incidentDate" type="date" {...form.register("incidentDate")} />
        </Field>
        <Field
          id="incidentCity"
          label="Incident city"
          error={form.formState.errors.incidentCity?.message}
        >
          <Input id="incidentCity" {...form.register("incidentCity")} />
        </Field>
        <Field
          id="injuries"
          label="Injuries or losses"
          error={form.formState.errors.injuries?.message}
          className="sm:col-span-2"
        >
          <Input id="injuries" {...form.register("injuries")} />
        </Field>
        <Field
          id="description"
          label="What happened"
          error={form.formState.errors.description?.message}
          className="sm:col-span-2"
        >
          <Textarea
            id="description"
            rows={6}
            placeholder="Tell us what you can. Dates, vehicles, road conditions, and what you remember of the crash."
            {...form.register("description")}
          />
        </Field>
      </div>

      <div className={cn("space-y-6", step !== 2 && "hidden")}>
        <dl className="grid gap-4 rounded-lg bg-elevated p-5 text-sm sm:grid-cols-2">
          <Review label="Name" value={values.name} />
          <Review label="Phone" value={values.phone} />
          <Review label="Email" value={values.email} />
          <Review label="City" value={values.city} />
          <Review label="Matter" value={matterLabel} />
          <Review
            label="Incident"
            value={`${values.incidentCity || "—"} · ${values.incidentDate || "—"}`}
          />
          <Review
            label="Injuries"
            value={values.injuries || "—"}
            className="sm:col-span-2"
          />
          <Review
            label="What happened"
            value={values.description}
            className="sm:col-span-2"
          />
        </dl>

        <Controller
          control={form.control}
          name="consent"
          render={({ field, fieldState }) => (
            <CheckRow
              id="consent"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              error={fieldState.error?.message}
            >
              I ask law firm staff to contact me about this inquiry. I
              understand that submitting this form does not create an
              attorney-client relationship.
            </CheckRow>
          )}
        />
        <Controller
          control={form.control}
          name="advertising"
          render={({ field, fieldState }) => (
            <CheckRow
              id="advertising"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              error={fieldState.error?.message}
            >
              I understand this website is attorney advertising and that prior
              results do not guarantee a similar outcome. We handle matters
              throughout California.
            </CheckRow>
          )}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={goNext}>
            Continue
          </Button>
        ) : (
          <Button
            type="button"
            variant="crimson"
            disabled={sending}
            onClick={() => void sendInquiry()}
          >
            {sending ? "Sending…" : "Send inquiry"}
          </Button>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="mt-1 text-xs text-crimson" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Review({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs uppercase tracking-wider text-subtle">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-paper">{value || "—"}</dd>
    </div>
  );
}

function CheckRow({
  id,
  checked,
  onCheckedChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className="mt-0.5"
        />
        <Label
          htmlFor={id}
          className="text-sm font-normal normal-case tracking-normal text-muted"
        >
          {children}
        </Label>
      </div>
      {error ? (
        <p className="mt-1 text-xs text-crimson" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
