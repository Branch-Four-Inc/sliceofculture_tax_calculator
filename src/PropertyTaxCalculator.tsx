import { useState } from "react";

// Brand type system
const FONT_HEADLINE = "'TT Ramillas', 'Helvetica Neue', sans-serif"; // display headline face
const FONT_HEADLINE_ITALIC = "'Montserrat', 'Helvetica Neue', sans-serif"; // italic accent word
const FONT_LABEL = "'Montserrat', 'Helvetica Neue', sans-serif"; // bold uppercase labels/eyebrows
const FONT_VALUE = "'Delicate Sans', 'Montserrat', 'Helvetica Neue', sans-serif"; // numeric/value face

// Brand palette
const COLOR_WHITE = "#ffffff";
const COLOR_YELLOW = "#ffce30";
const COLOR_ORANGE = "#ffa73c";
const COLOR_RED_ORANGE = "#ff6630";
const COLOR_BLACK = "#000000";

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
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.13em",
          color: focused ? COLOR_YELLOW : COLOR_BLACK,
          transition: "color 0.2s ease",
          fontFamily: FONT_LABEL,
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
              color: focused ? COLOR_YELLOW : "rgba(0,0,0,0.45)",
              pointerEvents: "none",
              fontFamily: FONT_VALUE,
              fontWeight: 700,
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
            fontFamily: FONT_VALUE,
            fontWeight: 700,
            border: `1.5px solid ${focused ? COLOR_YELLOW : "rgba(0,0,0,0.18)"}`,
            borderRadius: 8,
            outline: "none",
            background: focused ? "#fffaeb" : "#ffffff",
            color: COLOR_BLACK,
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(255,206,48,0.15)" : "none",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 14,
              fontSize: 15,
              color: focused ? COLOR_YELLOW : "rgba(0,0,0,0.45)",
              pointerEvents: "none",
              fontFamily: FONT_VALUE,
              fontWeight: 700,
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

function CommaInputField({ label, id, value, onChange, prefix }: Omit<InputFieldProps, "suffix" | "step">) {
  const [focused, setFocused] = useState(false);

  // Format a raw numeric string with commas
  function addCommas(raw: string): string {
    const digits = raw.replace(/[^0-9]/g, "");
    if (!digits) return "";
    return Number(digits).toLocaleString("en-US");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Strip commas, pass raw number string upstream
    const raw = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(raw)) onChange(raw);
  }

  const displayValue = focused ? value : addCommas(String(value));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        htmlFor={id}
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.13em",
          color: focused ? COLOR_YELLOW : COLOR_BLACK,
          transition: "color 0.2s ease",
          fontFamily: FONT_LABEL,
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
              color: focused ? COLOR_YELLOW : "rgba(0,0,0,0.45)",
              pointerEvents: "none",
              fontFamily: FONT_VALUE,
              fontWeight: 700,
              transition: "color 0.2s ease",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: `13px 14px 13px ${prefix ? "30px" : "14px"}`,
            fontSize: 16,
            fontFamily: FONT_VALUE,
            fontWeight: 700,
            border: `1.5px solid ${focused ? COLOR_YELLOW : "rgba(0,0,0,0.18)"}`,
            borderRadius: 8,
            outline: "none",
            background: focused ? "#fffaeb" : "#ffffff",
            color: COLOR_BLACK,
            transition: "all 0.2s ease",
            boxShadow: focused ? "0 0 0 3px rgba(255,206,48,0.15)" : "none",
          }}
        />
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
    variant === "increase" ? COLOR_RED_ORANGE : variant === "decrease" ? COLOR_BLACK : COLOR_BLACK;

  return (
    <div
      style={{
        background: COLOR_YELLOW,
        borderRadius: 10,
        padding: "0.9rem 0.75rem 0.85rem",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* brand shimmer top line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,102,48,0.8), transparent)",
        }}
      />
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(0,0,0,0.6)",
          fontFamily: FONT_LABEL,
          textAlign: "left",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: valueColor,
          fontFamily: FONT_VALUE,
          letterSpacing: "-0.01em",
          lineHeight: 1,
          textAlign: "left",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
      {note && (
        <div style={{ fontSize: 9, color: "rgba(0,0,0,0.55)", fontFamily: FONT_LABEL, fontWeight: 600, letterSpacing: "0.04em", textAlign: "left" }}>
          {note}
        </div>
      )}
    </div>
  );
}

export default function PropertyTaxCalculator() {
  const [assessedValue, setAssessedValue] = useState<string>("350000");
  const [oldRate, setOldRate] = useState<string>("2.00");
  const [newRate, setNewRate] = useState<string>("4.75");

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
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        @font-face {
          font-family: 'TT Ramillas';
          src: local('TT Ramillas'), local('TT Ramillas Bold');
          font-weight: 700;
          font-display: swap;
        }
        @font-face {
          font-family: 'Delicate Sans';
          src: local('Delicate Sans'), local('Delicate Sans Bold');
          font-weight: 700;
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
          background: COLOR_WHITE,
          backgroundImage: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1rem",
          fontFamily: FONT_LABEL,
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
                background: COLOR_WHITE,
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
                border: "1px solid rgba(255,167,60,0.2)",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 100, height: 100,
                borderRadius: "50%",
                border: "1px solid rgba(255,167,60,0.12)",
                pointerEvents: "none",
              }} />

              {/* Eyebrow */}
              <div style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLOR_ORANGE,
                fontFamily: FONT_LABEL,
                marginBottom: 10,
              }}>
                Slice of Culture
              </div>

              <h1 style={{
                fontSize: 34,
                fontWeight: 700,
                color: COLOR_RED_ORANGE,
                margin: 0,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                fontFamily: FONT_HEADLINE,
              }}>
                Property Tax
                <br />
                <span style={{ color: COLOR_RED_ORANGE, fontStyle: "italic", fontFamily: FONT_HEADLINE_ITALIC, fontWeight: 600 }}>Calculator</span>
              </h1>

              {/* Brand rule */}
              <div style={{
                marginTop: "1.4rem",
                height: 1,
                background: "linear-gradient(90deg, rgba(255,206,48,0.7), rgba(255,102,48,0.05))",
                width: "60%",
              }} />
            </div>

            {/* Body */}
            <div
              style={{
              background: COLOR_WHITE,
                padding: "2rem 2.2rem 2.2rem",
              }}
            >
              {/* Assessed value */}
              <div style={{ marginBottom: "1.3rem", color: COLOR_ORANGE }}>
                <CommaInputField
                  label="Assessed Property Value"
                  id="assessed-value"
                  value={assessedValue}
                  onChange={setAssessedValue}
                  prefix="$"
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
                <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }} />
                <span style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: COLOR_ORANGE,
                  fontFamily: FONT_LABEL,
                  whiteSpace: "nowrap",
                }}>
                  Tax Bill Comparison
                </span>
                <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.12)" }} />
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
                fontWeight: 600,
                color: COLOR_ORANGE,
                fontFamily: FONT_LABEL,
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