import { useState } from "react";

function fmt(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: focused ? "#39ff14" : "#ffffff",
          transition: "color 0.2s ease",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {prefix && (
          <span
            style={{
              position: "absolute",
              left: 14,
              fontSize: 14,
              color: focused ? "#39ff14" : "#ffffff",
              pointerEvents: "none",
              fontFamily: "'DM Mono', monospace",
              transition: "color 0.2s ease",
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: `12px ${suffix ? "40px" : "14px"} 12px ${prefix ? "32px" : "14px"}`,
            fontSize: 16,
            fontFamily: "'DM Mono', monospace",
            fontWeight: 500,
            border: `1px solid ${focused ? "#39ff14" : "#2a2a2a"}`,
            borderRadius: 6,
            outline: "none",
            background: focused ? "#111" : "#0d0d0d",
            color: "#f9fafb",
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(57,255,20,0.08)" : "none",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 14,
              fontSize: 14,
              color: focused ? "#39ff14" : "#ffffff",
              pointerEvents: "none",
              fontFamily: "'DM Mono', monospace",
              transition: "color 0.2s ease",
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
  subtext?: string;
  variant?: "default" | "increase" | "decrease";
}

function MetricCard({ label, value, variant = "default" }: MetricCardProps) {
  const valueColor =
    variant === "increase"
      ? "#ef4444"
      : variant === "decrease"
      ? "#22c55e"
      : "#000";

  return (
    <div
      style={{
        background: "#39ff14",
        borderRadius: 8,
        padding: "1.1rem 1.1rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(0,0,0,0.65)",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: valueColor,
          fontFamily: "'DM Mono', monospace",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default function PropertyTaxCalculator() {
  const [assessedValue, setAssessedValue] = useState<string>("350000");
  const [oldRate, setOldRate] = useState<string>("2.00");
  const [newRate, setNewRate] = useState<string>("5.25");

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600;700&display=swap');
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: 480 }}>

          {/* Header */}
          <div
            style={{
              background: "#000",
              border: "1px solid #1a1a1a",
              borderRadius: "10px 10px 0 0",
              padding: "1.75rem 2rem 1.5rem",
              borderBottom: "1px solid #39ff14",
            }}
          >
            <h1
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Property Tax
              <br />
              Calculator
            </h1>
          </div>

          {/* Body */}
          <div
            style={{
              background: "#0d0d0d",
              border: "1px solid #1a1a1a",
              borderTop: "none",
              borderRadius: "0 0 10px 10px",
              padding: "1.75rem 2rem 2rem",
            }}
          >
            {/* Assessed value */}
            <div style={{ marginBottom: "1.25rem" }}>
              <InputField
                label="Assessed Property Value"
                id="assessed-value"
                value={assessedValue}
                onChange={setAssessedValue}
                prefix="$"
                step={1000}
              />
            </div>

            {/* Rate inputs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: "2rem",
              }}
            >
              <InputField
                label="Old Tax Rate"
                id="old-rate"
                value={oldRate}
                onChange={setOldRate}
                suffix="%"
                step={0.01}
              />
              <InputField
                label="New Tax Rate"
                id="new-rate"
                value={newRate}
                onChange={setNewRate}
                suffix="%"
                step={0.01}
              />
            </div>

            {/* Divider */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: "1.25rem",
              }}
            >
              <div style={{ flex: 1, height: 1, background: "#1f1f1f" }} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Tax Bill Comparison
              </span>
              <div style={{ flex: 1, height: 1, background: "#1f1f1f" }} />
            </div>

            {/* Metric cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 8,
              }}
            >
              <MetricCard label="Old Bill" value={fmt(oldBill)} />
              <MetricCard label="New Bill" value={fmt(newBill)} />
              <MetricCard label="Difference" value={diffLabel} variant={diffVariant} />
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: "1.75rem",
                textAlign: "center",
                fontSize: 11,
                color: "#ffffff",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.05em",
              }}
            >
              Created by Branch Four Inc.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}