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
          color: focused ? "#C0F11D" : "#ffffff",
          transition: "color 0.2s ease",
          fontFamily: "'Roboto', sans-serif",
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
              color: focused ? "#C0F11D" : "rgba(255,255,255,0.5)",
              pointerEvents: "none",
              fontFamily: "'Roboto', sans-serif",
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
            fontFamily: "'Roboto', sans-serif",
            fontWeight: 500,
            border: `1.5px solid ${focused ? "#C0F11D" : "rgba(255,255,255,0.15)"}`,
            borderRadius: 8,
            outline: "none",
            background: focused ? "#161a02" : "#111300",
            color: "#ffffff",
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(192,241,29,0.12)" : "none",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 14,
              fontSize: 15,
              color: focused ? "#C0F11D" : "rgba(255,255,255,0.5)",
              pointerEvents: "none",
              fontFamily: "'Roboto', sans-serif",
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

function MetricCard({ label, value, note }: MetricCardProps) {
  const valueColor = "#000000";

  return (
    <div
      style={{
        background: "#DBF77D",
        borderRadius: 10,
        padding: "1.2rem 1rem 1.1rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* lime shimmer top line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(192,241,29,0.8), transparent)",
        }}
      />
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "rgba(0,0,0,0.55)",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: valueColor,
          fontFamily: "'Roboto', sans-serif",
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      {note && (
        <div style={{ fontSize: 9, color: "rgba(0,0,0,0.5)", fontFamily: "'Roboto', sans-serif", letterSpacing: "0.05em" }}>
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
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
        @font-face {
          font-family: 'March';
          src: local('March');
          font-display: swap;
        }
        *, *::before, *::after { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0b0e01",
          backgroundImage: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1rem",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <div style={{ width: "100%", maxWidth: 460 }}>

          {/* Card shell */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 24px 72px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#0b0e01",
                backgroundImage: "none",
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
                color: "#ffffff",
                fontFamily: "'Roboto', sans-serif",
                marginBottom: 10,
              }}>
                The Leveler News
              </div>

              <h1 style={{
                fontSize: 34,
                fontWeight: 700,
                color: "#C0F11D",
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontFamily: "'Regards', 'Regards Regular', serif",
              }}>
                Property Tax
                <br />
                <span style={{ color: "#C0F11D", fontStyle: "italic" }}>Calculator</span>
              </h1>

              {/* Lime rule */}
              <div style={{
                marginTop: "1.4rem",
                height: 1,
                background: "linear-gradient(90deg, rgba(192,241,29,0.6), rgba(192,241,29,0.05))",
                width: "60%",
              }} />
            </div>

            {/* Body */}
            <div
              style={{
              background: "#0b0e01",
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
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
                <span style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  fontFamily: "'Roboto', sans-serif",
                  whiteSpace: "nowrap",
                }}>
                  Tax Bill Comparison
                </span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
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
                color: "#ffffff",
                fontFamily: "'Roboto', sans-serif",
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