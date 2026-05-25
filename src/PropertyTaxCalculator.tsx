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

function InputField({ label, id, value, onChange, prefix, suffix, step = 1 }: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.13em",
          color: focused ? "#B07D2A" : "#8C7B6B",
          transition: "color 0.2s ease",
          fontFamily: "'Jost', sans-serif",
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
              fontSize: 15,
              color: focused ? "#B07D2A" : "#A89585",
              pointerEvents: "none",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
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
            padding: `13px ${suffix ? "42px" : "14px"} 13px ${prefix ? "30px" : "14px"}`,
            fontSize: 16,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            border: `1.5px solid ${focused ? "#B07D2A" : "#E2D9CF"}`,
            borderRadius: 8,
            outline: "none",
            background: focused ? "#FFFDF9" : "#FAF7F2",
            color: "#1A1410",
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(176,125,42,0.1)" : "none",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 14,
              fontSize: 15,
              color: focused ? "#B07D2A" : "#A89585",
              pointerEvents: "none",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 500,
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
  variant?: "default" | "increase" | "decrease";
  note?: string;
}

function MetricCard({ label, value, variant = "default", note }: MetricCardProps) {
  const valueColor =
    variant === "increase" ? "#FFAA88"
    : variant === "decrease" ? "#7ECBA1"
    : "#F0E8D6";

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #1B3A28 0%, #243F2F 100%)",
        borderRadius: 10,
        padding: "1.2rem 1rem 1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(27,58,40,0.18)",
      }}
    >
      {/* gold shimmer top line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(196,134,42,0.6), transparent)",
        }}
      />
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(240,232,214,0.55)",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: valueColor,
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {note && (
        <div style={{ fontSize: 9, color: "rgba(240,232,214,0.35)", fontFamily: "'Jost', sans-serif", letterSpacing: "0.05em" }}>
          {note}
        </div>
      )}
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
    diff > 0 ? `+${fmt(diff)}` : diff < 0 ? `−${fmt(Math.abs(diff))}` : fmt(diff);

  const diffVariant: MetricCardProps["variant"] =
    diff > 0 ? "increase" : diff < 0 ? "decrease" : "default";

  const pctChange = oldBill > 0 ? ((diff / oldBill) * 100) : 0;
  const pctLabel = pctChange !== 0
    ? `${pctChange > 0 ? "+" : ""}${pctChange.toFixed(1)}% change`
    : "no change";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#F0EAE0",
          backgroundImage: "radial-gradient(ellipse at 20% 80%, rgba(27,58,40,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 10%, rgba(176,125,42,0.08) 0%, transparent 50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1rem",
          fontFamily: "'Jost', sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: 460 }}>

          {/* Card shell */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 72px rgba(27,40,30,0.18), 0 4px 16px rgba(27,40,30,0.1)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #1B3A28 0%, #162E20 60%, #1F3D2B 100%)",
                backgroundImage: "linear-gradient(135deg, #1B3A28 0%, #162E20 60%, #1F3D2B 100%), radial-gradient(ellipse at top right, rgba(196,134,42,0.2) 0%, transparent 60%)",
                padding: "2.2rem 2.2rem 2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative corner arc */}
              <div style={{
                position: "absolute", top: -40, right: -40,
                width: 140, height: 140,
                borderRadius: "50%",
                border: "1px solid rgba(196,134,42,0.18)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 100, height: 100,
                borderRadius: "50%",
                border: "1px solid rgba(196,134,42,0.1)",
                pointerEvents: "none",
              }} />

              {/* Eyebrow */}
              <div style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(196,134,42,0.85)",
                fontFamily: "'Jost', sans-serif",
                marginBottom: 10,
              }}>
                The Leveler News
              </div>

              <h1 style={{
                fontSize: 34,
                fontWeight: 700,
                color: "#F0E8D6",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontFamily: "'Playfair Display', serif",
              }}>
                Property Tax
                <br />
                <span style={{ color: "#C4862A", fontStyle: "italic" }}>Calculator</span>
              </h1>

              {/* Gold rule */}
              <div style={{
                marginTop: "1.4rem",
                height: 1,
                background: "linear-gradient(90deg, rgba(196,134,42,0.7), rgba(196,134,42,0.1))",
                width: "60%",
              }} />
            </div>

            {/* Body */}
            <div
              style={{
                background: "#FFFFFF",
                padding: "2rem 2.2rem 2.2rem",
              }}
            >
              {/* Assessed value */}
              <div style={{ marginBottom: "1.3rem" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: "2.2rem" }}>
                <InputField
                  label="Current Rate"
                  id="old-rate"
                  value={oldRate}
                  onChange={setOldRate}
                  suffix="%"
                  step={0.01}
                />
                <InputField
                  label="New Rate"
                  id="new-rate"
                  value={newRate}
                  onChange={setNewRate}
                  suffix="%"
                  step={0.01}
                />
              </div>

              {/* Section label */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.1rem" }}>
                <div style={{ flex: 1, height: 1, background: "#EDE5DC" }} />
                <span style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#B09880",
                  fontFamily: "'Jost', sans-serif",
                  whiteSpace: "nowrap",
                }}>
                  Tax Bill Comparison
                </span>
                <div style={{ flex: 1, height: 1, background: "#EDE5DC" }} />
              </div>

              {/* Metric cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <MetricCard label="Current Bill" value={fmt(oldBill)} />
                <MetricCard label="New Bill" value={fmt(newBill)} />
                <MetricCard
                  label="Difference"
                  value={diffLabel}
                  variant={diffVariant}
                  note={oldBill > 0 ? pctLabel : undefined}
                />
              </div>

              {/* Footer */}
              <div style={{
                marginTop: "1.8rem",
                textAlign: "center",
                fontSize: 10.5,
                color: "#C4AE98",
                fontFamily: "'Jost', sans-serif",
                letterSpacing: "0.07em",
              }}>
                Created by Branch Four Inc.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}