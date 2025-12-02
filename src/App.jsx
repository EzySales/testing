import TikTokFeed from "./TikTokFeed";
// src/App.jsx
import React, { useState } from "react";
import "./index.css";
import logo from "./assets/logo.png";

function Modal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* FIXED HEADER */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
            background: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div style={{ padding: 20, overflowY: "auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- BUYING GUIDE ---------------- */
function BuyingGuideContent() {
  return (
    <div>
      <h4>Required documents</h4>
      <ol>
        <li>Identity Card (IC)</li>
        <li>Employment confirmation letter</li>
        <li>Latest 6 months payslips</li>
        <li>Latest 6 months bank statements (salary shown)</li>
        <li>Latest EPF statement</li>
        <li>Latest EA form</li>
        <li>CTOS report</li>
      </ol>

      <hr />

      <h4>Singapore Buyers</h4>
      <ul>
        <li>Passport copy</li>
        <li>Employment letter</li>
        <li>6 months payslips & bank statements</li>
        <li>CPF / NOA / Credit report</li>
      </ul>

      <hr />

      <h4>SSM / Sole Proprietor</h4>
      <ul>
        <li>SSM registration</li>
        <li>6–12 months business bank statements</li>
        <li>Latest tax forms (Form B)</li>
      </ul>


<hr />

<h4>Estimated Buying Costs (Malaysia)</h4>
<ul style={{ lineHeight: "1.6" }}>
  <li><strong>Legal Fees (SPA)</strong> — 1–2% of property price</li>
  <li><strong>Loan Agreement Legal Fees</strong> — based on loan amount</li>
  <li><strong>Stamp Duty for Loan</strong> — approx 0.5% of loan amount</li>
  <li><strong>Stamp Duty (MOT/Transfer)</strong>
    <br />
    • RM100,001–RM500,000 → 1%  
    <br />
    • RM500,001–RM1,000,000 → 2%  
    <br />
    • RM1,000,001 and above → 3%
  </li>
  <li><strong>Valuation Fees</strong> — applicable for sub-sale units</li>
  <li><strong>Bank Processing Fee</strong> — RM200–RM500 (varies by bank)</li>
  <li><strong>MRTA / MLTA Insurance</strong> — optional based on bank</li>
</ul>

    </div>
  );
}

/* ---------------- SELLING GUIDE ---------------- */
function SellingGuideContent() {
  return (
    <div style={{ lineHeight: "1.6" }}>
      <h4>Required Documents (Seller)</h4>
      <ul>
        <li>IC copy</li>
        <li>Title deed / SPA</li>
        <li>Latest loan statement</li>
        <li>Quit rent & assessment</li>
        <li>Utility bills</li>
      </ul>

      <h4>Estimated Seller Costs</h4>
      <ul>
        <li>Legal fees</li>
        <li>MOT / Transfer cost</li>
        <li>RPGT (if applicable)</li>
        <li>Agent commission</li>
      </ul>

      <hr />

      <h4>🧾 Seller Cost Breakdown (Example)</h4>
      <p><strong>Property Price:</strong> RM500,000</p>
      <ul>
        <li>Legal Fees (SPA): ~ RM6,000</li>
        <li>Disbursement Fees: ~ RM3,000</li>
        <li>RPGT (if applicable): 0–30%</li>
        <li>Agent Commission: 3% (RM15,000)</li>
      </ul>

      <p>
        <strong>Estimated Net Cash After Sale:</strong>  
        RM500,000 – all costs – outstanding loan balance.
      </p>

      <p style={{ fontSize: 14, color: "#777" }}>
        *Figures are estimated. Actual cost depends on law firm & government charges.
      </p>
    </div>
  );
}

/* ---------------- LOAN CALCULATORS ---------------- */
function HomeLoanCalculator() {
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("3.8");
  const [age, setAge] = useState("");
  const [tenure, setTenure] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function calculate() {
    const P = parseFloat(loan);
    const r = parseFloat(rate) / 100 / 12;
    const userAge = parseInt(age);

    if (!P || !r || !userAge) return;

    // 1️⃣ Age check
    if (userAge >= 70) {
      setError("❌ Loan cannot be taken because age has reached 70.");
      setResult(null);
      setTenure(null);
      return;
    }

    setError("");

    // 2️⃣ Compute tenure based on Malaysian rules
    let t = 70 - userAge;

    if (t > 35) {
      t = 35; // max limit
    }

    setTenure(t);

    const n = t * 12; // total months

    // Monthly instalment formula
    const M = (P * r) / (1 - Math.pow(1 + r, -n));

    setResult(M.toFixed(2));
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <label>Loan Amount (RM)</label>
      <input value={loan} onChange={(e) => setLoan(e.target.value)} />

      <label>Interest Rate (%)</label>
      <input value={rate} onChange={(e) => setRate(e.target.value)} />

      <label>Your Age (years)</label>
      <input value={age} onChange={(e) => setAge(e.target.value)} />

      <button className="btn" onClick={calculate} style={{ marginTop: 10 }}>
        Calculate
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 15 }}>{error}</p>
      )}

      {tenure && (
        <p style={{ marginTop: 15 }}>
          <strong>Loan Tenure:</strong> {tenure} years
        </p>
      )}

      {result && (
        <p style={{ marginTop: 10 }}>
          <strong>Monthly Instalment:</strong> RM {result}
        </p>
      )}
    </div>
  );
}

function DSRCalculator() {
  const [income, setIncome] = useState("");
  const [commitment, setCommitment] = useState("");
  const [output, setOutput] = useState(null);

  function checkEligibility(dsr) {
    if (dsr < 40)
      return {
        label: "Excellent Eligibility",
        color: "#00A65A",
        desc: "Very strong chance for loan approval.",
      };
    if (dsr < 50)
      return {
        label: "Good Eligibility",
        color: "#2ECC71",
        desc: "Good chance for approval.",
      };
    if (dsr < 60)
      return {
        label: "Borderline Eligibility",
        color: "#F1C40F",
        desc: "May require supporting documents or higher salary.",
      };
    if (dsr <= 65)
      return {
        label: "High Risk",
        color: "#E67E22",
        desc: "Approval is tough. Try reducing commitments.",
      };
    return {
      label: "Likely Rejected",
      color: "#C0392B",
      desc: "DSR too high. Bank will not approve.",
    };
  }

  function calculate() {
    const inc = parseFloat(income);
    const com = parseFloat(commitment);

    if (!inc && inc !== 0) return; // income required
    if (isNaN(com)) return; // commitments must be a number

    const FIXED_DSR = 65; // always 65%
    const allowed = inc * (FIXED_DSR / 100);
    const currentDSR = (com / inc) * 100;

    const maxMonthly = allowed - com;

    const minPrice = Math.max(0, maxMonthly * 180);
    const maxPrice = Math.max(0, maxMonthly * 220);

    const eligibility = checkEligibility(currentDSR);

    setOutput({
      currentDSR: currentDSR.toFixed(2),
      maxMonthly: maxMonthly.toFixed(2),
      minPrice: Math.round(minPrice),
      maxPrice: Math.round(maxPrice),
      eligibility,
    });
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <label>Monthly Income (RM)</label>
      <input
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        placeholder="e.g. 3000"
      />

      <label>Existing Commitments (RM)</label>
      <input
        value={commitment}
        onChange={(e) => setCommitment(e.target.value)}
        placeholder="e.g. 1000 (put 0 if none)"
      />

      <button className="btn" onClick={calculate} style={{ marginTop: 10 }}>
        Calculate
      </button>

      {output && (
        <div
          style={{
            marginTop: 25,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <div
            style={{
              padding: 12,
              borderRadius: 6,
              background: output.eligibility.color,
              color: "white",
              marginBottom: 15,
            }}
          >
            <strong>{output.eligibility.label}</strong>
            <div style={{ fontSize: 14 }}>{output.eligibility.desc}</div>
          </div>

          <p>
            <strong>Current DSR:</strong> {output.currentDSR}%
          </p>

          <p>
            <strong>Max Monthly Repayment Allowed:</strong> RM {output.maxMonthly}
          </p>

          <h4>Estimated Property Price You Can Buy:</h4>
          <p>
            RM {output.minPrice.toLocaleString()} –{" "}
            RM {output.maxPrice.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}

function ROICalculator() {
  const [price, setPrice] = useState("");
  const [rent, setRent] = useState("");
  const [installment, setInstallment] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState(null);

  function getDealLabel(cashflow) {
    if (cashflow >= 400) return { label: "Excellent Deal", color: "#00A65A", desc: "This unit gives very strong monthly profit. Very good for investment." };
    if (cashflow >= 250) return { label: "Very Good Deal", color: "#2ECC71", desc: "Monthly profit is high and stable. Good choice." };
    if (cashflow >= 100) return { label: "Good Deal", color: "#F1C40F", desc: "This property gives good profit. Worth to consider." };
    if (cashflow >= 1) return { label: "Average Deal", color: "#95A5A6", desc: "Small monthly profit. Can take if location is good." };
    if (cashflow >= -99) return { label: "Bad Deal", color: "#E67E22", desc: "This property gives small loss. Better think first." };
    if (cashflow >= -299) return { label: "Very Bad Deal", color: "#C0392B", desc: "You will lose money every month. Not recommended." };
    return { label: "DON’T TAKE – You Will Lose Money", color: "#8E0E0E", desc: "High monthly loss. This is a bad investment." };
  }

  function calculate() {
    const p = parseFloat(price);
    const r = parseFloat(rent);
    const i = parseFloat(installment) || 0;
    const m = parseFloat(maintenance) || 0;
    const o = parseFloat(other) || 0;

    if (!p || !r) return setResult(null);

    const annualRent = r * 12;
    const annualInstallment = i * 12;
    const annualMaintenance = m * 12;
    const annualOther = o * 12;

    const totalExpenses = annualInstallment + annualMaintenance + annualOther;
    const netYearly = annualRent - totalExpenses;
    const netMonthly = netYearly / 12;

    const deal = getDealLabel(netMonthly);

    setResult({
      annualRent,
      annualInstallment,
      annualMaintenance,
      annualOther,
      totalExpenses,
      netYearly,
      netMonthly,
      deal
    });
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <label>House Price (RM)</label>
      <input value={price} onChange={(e) => setPrice(e.target.value)} />

      <label>Monthly Rent You Can Get (RM)</label>
      <input value={rent} onChange={(e) => setRent(e.target.value)} />

      <label>Loan Installment (RM / month)</label>
      <input value={installment} onChange={(e) => setInstallment(e.target.value)} />

      <label>Maintenance Fee (RM / month)</label>
      <input value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />

      <label>Other Monthly Costs (RM)</label>
      <input value={other} onChange={(e) => setOther(e.target.value)} />

      <button className="btn" onClick={calculate} style={{ marginTop: 10 }}>
        Calculate
      </button>

      {result && (
        <div
          style={{
            marginTop: 25,
            padding: 20,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>📊 Investment Summary</h3>

          {/* Deal Rating */}
          <div
            style={{
              padding: 12,
              borderRadius: 6,
              background: result.deal.color,
              color: "white",
              marginBottom: 15,
            }}
          >
            <strong>{result.deal.label}</strong>
            <div style={{ fontSize: 14, marginTop: 4 }}>{result.deal.desc}</div>
          </div>

          <p><strong>Your Monthly Profit:</strong> RM {result.netMonthly.toFixed(2)}</p>
          <p><strong>Your Yearly Profit:</strong> RM {result.netYearly.toFixed(2)}</p>

          <hr />

          <h4>Total Yearly Income</h4>
          <p>Rent (Annual): RM {result.annualRent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>

          <h4>Your Yearly Costs</h4>
          <p>Loan Installment (Annual): RM {result.annualInstallment.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <p>Maintenance (Annual): RM {result.annualMaintenance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <p>Other Costs (Annual): RM {result.annualOther.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>

          <p><strong>Total Yearly Expenses:</strong> RM {result.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>
      )}
    </div>
  );
}

function SellerCostCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [loanBalance, setLoanBalance] = useState("");
  const [yearsOwned, setYearsOwned] = useState("1");
  const [lawyerType, setLawyerType] = useState("buyer");
  const [bankPenalty, setBankPenalty] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    const buy = parseFloat(buyPrice) || 0;
    const sell = parseFloat(sellPrice) || 0;
    const loan = parseFloat(loanBalance) || 0;
    const bankPen = parseFloat(bankPenalty) || 0;

    if (!sell || !buy) return;

    // Commission (3.24%)
    const agentFee = sell * 0.0324;

    // Lawyer fees:
    // - If seller uses own lawyer → 1% + 0.5%
    // - If using buyer lawyer → 0.5% only
    let lawyerFee = 0;
    let disbursement = 0;

    if (lawyerType === "own") {
      lawyerFee = sell * 0.01;        // 1%
      disbursement = sell * 0.005;    // 0.5%
    } else {
      lawyerFee = sell * 0.005;       // 0.5% shared
      disbursement = 0;               // buyer pays their own
    }

    // Total allowable expenses for RPGT
    const allowableExpenses = agentFee + lawyerFee + disbursement;

    // Gross Profit
    const grossProfit = sell - buy;

    // RPGT Rates
    const year = yearsOwned;
    let rpgRate = 0;

    if (year === "1") rpgRate = 30;
    else if (year === "2") rpgRate = 30;
    else if (year === "3") rpgRate = 20;
    else if (year === "4") rpgRate = 15;
    else if (year === "5") rpgRate = 5;
    else rpgRate = 0; // > 5 years → No RPGT

    // Chargeable Gain = Gross Profit - allowable expenses
    let chargeableGain = grossProfit - allowableExpenses;
    if (chargeableGain < 0) chargeableGain = 0;

    const rpgt = chargeableGain * (rpgRate / 100);

    // Bank penalty
    const penaltyValue = (bankPen / 100) * loan;

    // Total cost
    const totalCost =
      agentFee + lawyerFee + disbursement + rpgt + penaltyValue + loan;

    // Net Cash received
    const netCash = sell - totalCost;

    setResult({
      agentFee,
      lawyerFee,
      disbursement,
      allowableExpenses,
      grossProfit,
      chargeableGain,
      rpgt,
      penaltyValue,
      totalCost,
      netCash,
      buy,
      sell,
      loan,
    });
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h2>Seller Cost Calculator</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <label>Buying Price (RM)</label>
          <input
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="e.g. 400000"
          />
        </div>

        <div style={{ flex: 1 }}>
          <label>Selling Price (RM)</label>
          <input
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="e.g. 500000"
          />
        </div>
      </div>

      <label>Current Loan Balance (RM)</label>
      <input
        value={loanBalance}
        onChange={(e) => setLoanBalance(e.target.value)}
        placeholder="e.g. 300000"
      />

      <label>RPGT — Years Owned</label>
      <select value={yearsOwned} onChange={(e) => setYearsOwned(e.target.value)}>
        <option value="1">1 year</option>
        <option value="2">2 years</option>
        <option value="3">3 years</option>
        <option value="4">4 years</option>
        <option value="5">5 years</option>
        <option value="6">More than 5 years (No RPGT)</option>
      </select>

      <label>Who Uses Lawyer?</label>
      <select value={lawyerType} onChange={(e) => setLawyerType(e.target.value)}>
        <option value="buyer">Using Buyer Lawyer</option>
        <option value="own">Using Own Lawyer</option>
      </select>

      <label>Bank Penalty (%)</label>
      <input
        value={bankPenalty}
        onChange={(e) => setBankPenalty(e.target.value)}
        placeholder="e.g. 0.5"
      />

      <button className="btn" style={{ marginTop: 20 }} onClick={calculate}>
        Calculate Seller Cost
      </button>

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            background: "#fafafa",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        >
          <h3>📘 Summary</h3>
          <p>Buying Price: RM {result.buy.toLocaleString()}</p>
          <p>Selling Price: RM {result.sell.toLocaleString()}</p>
          <p>
            <strong>Gross Profit:</strong> RM{" "}
            {result.grossProfit.toLocaleString()}
          </p>

          <hr />

          <h4>🧮 Cost Breakdown</h4>
          <p>Agent Fee (3.24%): RM {result.agentFee.toFixed(2)}</p>
          <p>Lawyer Fee: RM {result.lawyerFee.toFixed(2)}</p>
          <p>Disbursement: RM {result.disbursement.toFixed(2)}</p>
          <p>
            Chargeable Gain for RPGT: RM{" "}
            {result.chargeableGain.toFixed(2)}
          </p>
          <p>RPGT Amount: RM {result.rpgt.toFixed(2)}</p>
          <p>Bank Penalty: RM {result.penaltyValue.toFixed(2)}</p>
          <p>Loan Balance to Settle: RM {result.loan.toLocaleString()}</p>

          <hr />

          <h3>💰 Net Money Received</h3>
          <p>Total Costs: RM {result.totalCost.toLocaleString()}</p>
          <h2
            style={{
              color: result.netCash < 0 ? "red" : "green",
              marginTop: 10,
            }}
          >
            Net Cash: RM {result.netCash.toLocaleString()}
          </h2>
        </div>
      )}
    </div>
  );
}


/* ---------------- PAGES ---------------- */
function ListingsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Listings</h2>
      <iframe
        src="https://www.veedu.my"
        style={{ width: "100%", height: "700px", border: 0 }}
        title="Listings"
      ></iframe>
    </div>
  );
}

function CalendarPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Team Calendar</h2>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=kishenk63%40gmail.com&ctz=Asia/Kuala_Lumpur"
        style={{ width: "100%", height: "700px", border: 0 }}
        title="Calendar"
      ></iframe>
    </div>
  );
}

function LoanPage() {
  const [tab, setTab] = useState("dsr");

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>Loan Calculators</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <button className="btn" onClick={() => setTab("dsr")}>
          DSR Calculator
        </button>
        <button className="btn" onClick={() => setTab("home")}>
          Home Loan Calculator
        </button>
        <button className="btn" onClick={() => setTab("roi")}>
          ROI Calculator
        </button>
        <button className="btn" onClick={() => setTab("seller")}>
          Seller Calculator
        </button>
      </div>

      {tab === "dsr" && <DSRCalculator />}
      {tab === "home" && <HomeLoanCalculator />}
      {tab === "roi" && <ROICalculator />}
      {tab === "seller" && <SellerCostCalculator />}
    </div>
  );
}


/* ---------------- MAIN ---------------- */
export default function App() {
  const [page, setPage] = useState("home");

  const [showBuying, setShowBuying] = useState(false);
  const [showSelling, setShowSelling] = useState(false);
  const [showValuation, setShowValuation] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);

  /* ---------------- VALUATION FORM ---------------- */
  const [val, setVal] = useState({
    type: "",
    title: "",
    cond: "",
    area: "",
    built: "",
    land: "",
    owner: "",
    phone: "",
  });

  function sendValuationToWhatsApp() {
    const text = `
🔍 PROPERTY VALUATION REQUEST
Property Type: ${val.type}
Title: ${val.title}
Condition: ${val.cond}
Area: ${val.area}
Built-up: ${val.built}
Land: ${val.land}
Owner: ${val.owner}
Phone: ${val.phone}
    `;

    window.open(
      `https://wa.me/60185906909?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  /* ---------------- ELIGIBILITY FORM ---------------- */
  const [elig, setElig] = useState({
    name: "",
    income: "",
    loans: "",
    epf: "Yes",
    loc: "Singapore",
    work: "",
    loanType: "10% Deposit / Full Loan",
    monthlyBudget: "",
    budget: "",
  });

  function sendEligToWhatsApp() {
    const text = `
🧾 BUYER ELIGIBILITY CHECK
Name: ${elig.name}
Income MYR: ${elig.income}
Loans : MYR ${elig.loans}
EPF Deduction: ${elig.epf}
Working Location: ${elig.loc}
Working As : ${elig.work}
Loan Type : ${elig.loanType}
Monthly Loan Budget : RM${elig.monthlyBudget}
Budget: RM${elig.budget}
    `;

    window.open(
      `https://wa.me/60185906909?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  /* ---------------- HEADER (STICKY) ---------------- */
  const headerStyles = {
    position: "sticky",
    top: 0,
    background: "#ffffffcc",
    backdropFilter: "blur(6px)",
    padding: "12px 0",
    zIndex: 999,
    borderBottom: "1px solid #eee",
  };

  return (
    <div>
      {/* HEADER */}
      <div style={headerStyles}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img src={logo} alt="logo" style={{ width: 70 }} />
            <div style={{ textAlign: "left" }}>
              <h2 style={{ margin: 0 }}>AK Property</h2>
              <p style={{ margin: 0, fontSize: 14, color: "#555" }}>
                Professional Real Estate Services in Malaysia
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 12,
              flexWrap: "wrap",
            }}
          >
            <button className="btn" onClick={() => setPage("home")}>
              Home
            </button>
            <button className="btn" onClick={() => setPage("listings")}>
              Listings
            </button>
                        <button className="btn" onClick={() => setPage("loan")}>
              Loan Calculator
            </button>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>
        {page === "home" && (
          <div style={{ textAlign: "center" }}>
            {/* ---- HOME ACTION BUTTONS ---- */}
            <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 16,
  }}
>
  <button className="btn" onClick={() => setShowBuying(true)}>
    Buyer
  </button>
  <button className="btn" onClick={() => setShowSelling(true)}>
    Seller
  </button>
  <button className="btn" onClick={() => setShowValuation(true)}>
    Property Value
  </button>
  <button className="btn" onClick={() => setShowEligibility(true)}>
    Loan Check
  </button>
</div>


            {/* WHY CHOOSE */}
            <div
              style={{
                marginTop: 30,
                background: "#fff",
                border: "1px solid #eee",
                padding: 20,
                borderRadius: 8,
              }}
            >
              <h4>Why choose AK Property</h4>
              <p>Accurate valuations, practical loan advice, and full support.</p>
            </div>

          </div>
        )}

        {page === "listings" && <ListingsPage />}
        
        {page === "loan" && <LoanPage />}
      </div>

      {/* FLOATING CHAT BUTTON */}
      <a
        href="https://wa.me/60185906909"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          bottom: 18,
          right: 18,
          background: "#f4a100",
          color: "#fff",
          padding: "12px 22px",
          borderRadius: 30,
          textDecoration: "none",
          fontWeight: "bold",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          zIndex: 9999,
        }}
      >
        Chat with AK
      </a>

      {/* ---------------- MODALS ---------------- */}

      {showBuying && (
        <Modal title="Buyer — Documents & Costs" onClose={() => setShowBuying(false)}>
          <BuyingGuideContent />
        </Modal>
      )}

      {showSelling && (
        <Modal title="Seller — Documents & Costs" onClose={() => setShowSelling(false)}>
          <SellingGuideContent />
        </Modal>
      )}

      {showValuation && (
        <Modal title="Check Property Value" onClose={() => setShowValuation(false)}>
          <div style={{ display: "grid", gap: 8 }}>
            <label>Property Type</label>
            <select
              value={val.type}
              onChange={(e) => setVal({ ...val, type: e.target.value })}
            >
              <option value="">Select</option>
              <option>1 Storey</option>
              <option>2 Storey</option>
              <option>Terrace</option>
              <option>Semi-D</option>
              <option>Bungalow</option>
              <option>Condo</option>
            </select>

            <label>Title</label>
            <select
              value={val.title}
              onChange={(e) => setVal({ ...val, title: e.target.value })}
            >
              <option value="">Select</option>
              <option>Freehold</option>
              <option>Leasehold</option>
            </select>

            <label>Condition</label>
            <select
              value={val.cond}
              onChange={(e) => setVal({ ...val, cond: e.target.value })}
            >
              <option value="">Select</option>
              <option>Basic</option>
              <option>Renovated</option>
            </select>

            <label>Area / Taman</label>
            <input
              placeholder="e.g. Taman Bukit Rawang Jaya"
              value={val.area}
              onChange={(e) => setVal({ ...val, area: e.target.value })}
            />

            <div style={{ display: "flex", gap: 8 }}>
              <input
                placeholder="Built-up (sqft)"
                value={val.built}
                onChange={(e) => setVal({ ...val, built: e.target.value })}
              />
              <input
                placeholder="Land size"
                value={val.land}
                onChange={(e) => setVal({ ...val, land: e.target.value })}
              />
            </div>

            <input
              placeholder="Owner name"
              value={val.owner}
              onChange={(e) => setVal({ ...val, owner: e.target.value })}
            />

            <input
              placeholder="Phone number"
              value={val.phone}
              onChange={(e) => setVal({ ...val, phone: e.target.value })}
            />

            <button className="btn" onClick={sendValuationToWhatsApp}>
              Submit to WhatsApp
            </button>
          </div>
        </Modal>
      )}

      {showEligibility && (
  <Modal title="Check Loan Eligibility" onClose={() => setShowEligibility(false)}>
    <div style={{ 
      display: "grid", 
      gap: 8, 
      fontSize: "15px",        // <<< Add this
      lineHeight: "1.4"        // <<< Cleaner spacing
    }}>
      
      <label style={{ fontSize: "14px" }}>Name</label>
      <input
        value={elig.name}
        onChange={(e) => setElig({ ...elig, name: e.target.value })}
      />

      <label style={{ fontSize: "14px" }}>Net Salary (RM)</label>
      <input
        value={elig.income}
        onChange={(e) => setElig({ ...elig, income: e.target.value })}
      />

      <label style={{ fontSize: "14px" }}>Existing Loans (RM)</label>
      <input
        value={elig.loans}
        onChange={(e) => setElig({ ...elig, loans: e.target.value })}
      />

      <label style={{ fontSize: "14px" }}>EPF Deduction</label>
      <select
        value={elig.epf}
        onChange={(e) => setElig({ ...elig, epf: e.target.value })}
      >
        <option>Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label style={{ fontSize: "14px" }}>Occupation / Job Title</label>
      <input
        value={elig.work}
        onChange={(e) => setElig({ ...elig, work: e.target.value })}
      />

      <label style={{ fontSize: "14px" }}>Loan Type</label>
      <select
        value={elig.loanType}
        onChange={(e) => setElig({ ...elig, loanType: e.target.value })}
      >
        <option>Select</option>
        <option>10% Deposit</option>
        <option>Full Loan</option>
        <option>Cashback</option>
      </select>

      <label style={{ fontSize: "14px" }}>Monthly Loan Budget (RM)</label>
      <input
        value={elig.monthlyBudget}
        onChange={(e) => setElig({ ...elig, monthlyBudget: e.target.value })}
      />

      <label style={{ fontSize: "14px" }}>Property Budget (RM)</label>
      <input
        value={elig.budget}
        onChange={(e) => setElig({ ...elig, budget: e.target.value })}
      />

      <button className="btn" onClick={sendEligToWhatsApp}>
        Submit to WhatsApp
      </button>
    </div>
  </Modal>
)}


    </div>
  );
}
