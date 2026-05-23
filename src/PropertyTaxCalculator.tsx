import { useState } from "react";

function fmt(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
}

interface InputFieldProps {
  label: string;
  id: string;
  value: number | string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}

function InputField({
  label,
  id,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: InputFieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#6b7280",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 12,
              fontSize: 15,
              color: "#9ca3af",
              pointerEvents: "none",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: `10px ${suffix ? "36px" : "12px"} 10px ${prefix ? "28px" : "12px"}`,
            fontSize: 15,
            border: "0.5px solid #d1d5db",
            borderRadius: 8,
            outline: "none",
            background: "#fff",
            color: "#111827",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 12,
              fontSize: 15,
              color: "#9ca3af",
              pointerEvents: "none",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  variant?: "default" | "increase" | "decrease";
}

function MetricCard({ label, value, variant = "default" }: MetricCardProps) {
  const valueColor =
    variant === "increase"
      ? "#991b1b"
      : variant === "decrease"
      ? "#065f46"
      : "#111827";

  return (
    <div
      style={{
        background: "#f9fafb",
        borderRadius: 8,
        padding: "1rem 1.25rem",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          color: "#6b7280",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 20, fontWeight: 500, color: valueColor }}>
        {value}
      </div>
    </div>
  );
}

export default function PropertyTaxCalculator() {
  const [assessedValue, setAssessedValue] = useState<string>("350000");
  const [oldRate, setOldRate] = useState<string>("1.10");
  const [newRate, setNewRate] = useState<string>("1.25");

  const value = parseFloat(assessedValue) || 0;
  const oldRateNum = parseFloat(oldRate) || 0;
  const newRateNum = parseFloat(newRate) || 0;

  const oldBill = value * (oldRateNum / 100);
  const newBill = value * (newRateNum / 100);
  const diff = newBill - oldBill;

  const diffLabel =
    diff > 0 ? `+${fmt(diff)}` : diff < 0 ? `−${fmt(diff)}` : fmt(diff);

  const diffVariant: MetricCardProps["variant"] =
    diff > 0 ? "increase" : diff < 0 ? "decrease" : "default";

  return (
    <div
      style={{
        maxWidth: 520,
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "0.5px solid #e5e7eb",
          borderRadius: 12,
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#111827",
            margin: "0 0 1.5rem",
          }}
        >
          Property tax calculator
        </h1>

        <div style={{ marginBottom: "1.25rem" }}>
          <InputField
            label="Assessed property value"
            id="assessed-value"
            value={assessedValue}
            onChange={setAssessedValue}
            prefix="$"
            step={1000}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: "1.5rem",
          }}
        >
          <InputField
            label="Old tax rate"
            id="old-rate"
            value={oldRate}
            onChange={setOldRate}
            suffix="%"
            step={0.01}
          />
          <InputField
            label="New tax rate"
            id="new-rate"
            value={newRate}
            onChange={setNewRate}
            suffix="%"
            step={0.01}
          />
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "0.5px solid #e5e7eb",
            margin: "0 0 1.25rem",
          }}
        />

        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#6b7280",
            marginBottom: 10,
          }}
        >
          Tax bill comparison
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
          }}
        >
          <MetricCard label="Old bill" value={fmt(oldBill)} />
          <MetricCard label="New bill" value={fmt(newBill)} />
          <MetricCard label="Difference" value={diffLabel} variant={diffVariant} />
        </div>
      </div>
    </div>
  );
}
