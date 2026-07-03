/* =====================================================================
   SH ELEVATE — Insights/Blog: listing + full-screen reader overlay
   ===================================================================== */
(function () {
  "use strict";
  const grid = document.getElementById("blog-grid");
  if (!grid) return;

  const A = [
    {
      slug: "how-to-file-t1-personal-tax-return-canada",
      title: "How to File Your T1 Tax Return in Canada (2026): A Step-by-Step Guide",
      category: "Personal Tax", readTime: "12 min read", date: "2026-02-09",
      excerpt: "A clear, step-by-step guide to filing your 2025 T1 return in 2026: slips to gather, NETFILE vs paper, the April 30 deadline, late-filing penalties, and refund timing.",
      intro: "Filing your T1 personal income tax return is an annual requirement for most Canadian residents. Whether you earned employment income, self-employment income, investment income, or any combination, the Canada Revenue Agency (CRA) requires you to report your worldwide income each year. This comprehensive guide walks you through everything you need to know to file your T1 correctly and maximize your refund.",
      body: [
        { h: "Who Needs to File a T1 Return?", p: ["You must file a T1 return if you owe tax for the year, if the CRA sent you a request to file, if you disposed of capital property, or if you want to claim a refund. Even if you had no income, filing is often beneficial to maintain eligibility for benefits like the GST/HST credit, Canada Child Benefit, and provincial programs.", "Canadian residents are taxed on their worldwide income regardless of where it was earned. Non-residents who earned Canadian-source income may also need to file."] },
        { h: "Key Filing Deadlines for 2025", p: ["For most Canadians, the tax filing deadline is April 30, 2025. Self-employed individuals and their spouses have until June 15, 2025, to file — however, any balance owing is still due by April 30. Missing the deadline results in a late-filing penalty of 5% of the balance owing, plus 1% for each additional month (up to 12 months).", "The CRA begins accepting NETFILE submissions on February 24, 2025. The T1 filing deadline and payment due date is April 30, 2025, with an extended deadline of June 15, 2025 for self-employed filers."] },
        { h: "Documents You Need to File", p: ["Before you start, gather all your tax slips and receipts. Employers must issue T4 slips by the end of February. Common income slips include T4 (employment), T4A (pension/other), T5 (investments), T3 (trusts), T4E (EI benefits), T5007 (social assistance), and T2202 (tuition).", "Common receipts include RRSP contribution receipts, medical expense receipts, charitable donation receipts, childcare receipts, moving expense records, and union dues."] },
        { h: "Common Deductions and Credits", p: ["The Canadian tax system offers numerous deductions and credits that can significantly reduce your tax bill. Deductions reduce your taxable income, while credits directly reduce the amount of tax you owe.", "Key deductions include RRSP contributions, moving expenses for work or school, childcare expenses, and employment expenses if you worked from home. Non-refundable credits include the basic personal amount, the Canada Employment Amount, medical expenses, charitable donations, and tuition amounts.", "Many Canadians miss the climate action incentive payment, the disability tax credit, and the Canada Workers Benefit. Working with a tax professional ensures you claim every deduction and credit you are entitled to."] },
        { h: "How to File: NETFILE, EFILE, and Paper", p: ["The CRA offers several filing methods. NETFILE allows you to file directly using certified tax software. EFILE is done through a tax professional like SH Elevate who transmits your return electronically. Paper filing is still accepted but takes significantly longer — typically 8-12 weeks versus 2 weeks for electronic filing.", "At SH Elevate Financial Group, we use the EFILE system to ensure your return is received and processed as quickly as possible. Our remote process means you can file from anywhere in Canada — from Thunder Bay to Corner Brook to Grande Prairie."] },
      ],
    },
    {
      slug: "corporate-tax-t2-guide-small-business",
      title: "T2 Corporate Tax Return Guide for Small Business (2026)",
      category: "Corporate Tax", readTime: "15 min read", date: "2026-02-04",
      excerpt: "Your 2026 T2 corporate tax return guide: who must file, the 6-month deadline, when to pay, the small business deduction (~11.2% in Ontario), deductions and instalments.",
      intro: "If you operate a corporation in Canada, filing a T2 corporate income tax return is mandatory — even if the corporation had no income or was inactive during the tax year. The T2 return is substantially more complex than a personal T1 return, and errors can lead to penalties, reassessments, and missed tax-saving opportunities. This guide covers everything small business owners need to know.",
      body: [
        { h: "Filing Deadlines and Penalties", p: ["A T2 return must be filed within six months of the corporation's fiscal year-end. For example, if your fiscal year ends December 31, your T2 is due June 30. However, any balance owing must be paid within two months of the year-end (three months for certain CCPCs with taxable income under $500,000).", "Late filing triggers a penalty of 5% of the unpaid tax, plus 1% per month for up to 12 months. For repeat offenders, penalties double. The CRA takes corporate filing seriously, so timely filing is essential."] },
        { h: "Understanding the Small Business Deduction (SBD)", p: ["The small business deduction is one of the most valuable tax benefits for Canadian-Controlled Private Corporations (CCPCs). It reduces the federal corporate tax rate on the first $500,000 of active business income from 15% to 9%. Combined with provincial rates, a CCPC in Ontario pays approximately 12.2% on qualifying income — one of the lowest rates in the developed world.", "To qualify, your corporation must be a CCPC throughout the tax year, meaning it cannot be controlled directly or indirectly by non-residents or public corporations. The business limit is shared among associated corporations, so if you own multiple companies, planning is crucial."] },
        { h: "Key Deductions for Small Businesses", p: ["Canadian corporations can deduct all reasonable business expenses incurred to earn income. Common deductions include salaries and wages, rent and utilities, professional fees, insurance premiums, advertising costs, vehicle expenses for business use, and capital cost allowance (CCA) on depreciable assets.", "The immediate expensing rules allow CCPCs to fully deduct up to $1.5 million in eligible capital purchases in the year they are acquired — including computers, vehicles, equipment, and furniture."] },
        { h: "Salary vs. Dividends: Planning Your Compensation", p: ["One of the most important decisions for owner-managers is how to extract money from the corporation. Salary creates RRSP room, CPP contributions, and is deductible to the corporation. Dividends are taxed at lower personal rates through the dividend tax credit but do not create RRSP room. The optimal mix depends on your personal situation, provincial rates, and retirement planning goals.", "At SH Elevate, we model both scenarios for every client to find the most tax-efficient approach. For many business owners in Northern Ontario and Atlantic Canada, the right salary-dividend mix can save thousands annually."] },
      ],
    },
    {
      slug: "gst-hst-registration-filing-guide",
      title: "GST/HST Registration and Filing Guide (2026)",
      category: "GST/HST", readTime: "10 min read", date: "2026-01-27",
      excerpt: "Your 2026 GST/HST guide: the $30,000 small-supplier threshold, the 29-day window to register, how to get a BN and RT account, filing frequencies, and ITCs.",
      intro: "The Goods and Services Tax (GST) and Harmonized Sales Tax (HST) are consumption taxes that apply to most goods and services sold in Canada. If you run a business, understanding when to register, how to collect, and how to file is critical for staying compliant with the CRA. This guide covers everything from the small supplier threshold to input tax credits.",
      body: [
        { h: "The Small Supplier Threshold: $30,000", p: ["You must register for GST/HST if your total taxable revenue exceeds $30,000 in a single calendar quarter or over four consecutive calendar quarters. This is known as the small supplier threshold. Once you exceed it, you must register within 29 days.", "Even if you are below the threshold, you may want to register voluntarily — because registered businesses can claim Input Tax Credits (ITCs) to recover the GST/HST paid on business purchases. If your business has significant startup costs or ongoing expenses, voluntary registration can result in net refunds from the CRA."] },
        { h: "Understanding HST Rates Across Canada", p: ["The tax rate depends on where the supply is made. Ontario charges 13% HST, the Atlantic provinces (Nova Scotia, New Brunswick, Newfoundland and Labrador, PEI) charge 15% HST, and Alberta, British Columbia, Saskatchewan, Manitoba, and the territories charge 5% GST.", "For businesses serving clients across provinces — like SH Elevate serving clients from Thunder Bay to Nova Scotia — understanding place-of-supply rules is essential to charging the correct rate."] },
        { h: "Input Tax Credits (ITCs): Getting Your Money Back", p: ["ITCs allow you to recover the GST/HST you paid on purchases used in your commercial activities. To claim ITCs, you need proper documentation including the supplier's name, GST/HST registration number, date, amount paid, and the GST/HST charged. For purchases under $30, simplified rules apply.", "Common ITC-eligible expenses include office supplies, equipment, professional services, vehicle expenses (business portion), rent, and utilities. Keeping organized records throughout the year makes filing significantly easier."] },
        { h: "Filing Frequencies: Annual, Quarterly, or Monthly", p: ["The CRA assigns filing frequencies based on your annual revenue. If your taxable supplies are $1.5 million or less, you can file annually. Between $1.5 million and $6 million, you must file quarterly. Over $6 million requires monthly filing. You can request a more frequent filing period if you prefer — some businesses prefer quarterly filing to manage cash flow and claim ITCs more often."] },
      ],
    },
    {
      slug: "top-tax-deductions-self-employed-canada",
      title: "Self-Employed Tax Deductions in Canada: Your 2026 Checklist",
      category: "Deductions", readTime: "11 min read", date: "2026-01-19",
      excerpt: "A plain-English 2026 checklist of self-employed tax deductions in Canada: T2125, home office (detailed method), vehicle, meals, CPP, and the six-year records rule.",
      intro: "Self-employed Canadians — freelancers, contractors, consultants, and gig workers — have access to a wide range of tax deductions that salaried employees cannot claim. These deductions are reported on Form T2125 (Statement of Business or Professional Activities) and can dramatically reduce your taxable income. Here are the top 15 deductions you should know about.",
      body: [
        { h: "1. Home Office Expenses", p: ["If you use a dedicated space in your home regularly and exclusively for business, you can deduct a proportionate share of your household expenses — rent or mortgage interest, property taxes, utilities, home insurance, and maintenance. The deduction is calculated based on the percentage of your home used for business.", "The CRA also offers a simplified flat-rate method: $2 per day worked from home, up to $500 per year. For most self-employed individuals, the detailed method yields a larger deduction."] },
        { h: "2. Vehicle Expenses", p: ["If you use your vehicle for business, you can deduct the business-use portion of gas, insurance, maintenance, lease payments or CCA, parking, and registration fees. You must keep a logbook tracking business versus personal kilometres — the CRA requires this documentation for audit purposes."] },
        { h: "3-7. Professional Services, Supplies & Equipment", p: ["Accounting and legal fees, office supplies, computer equipment, software subscriptions, and internet costs are all deductible. For capital purchases over $500, you claim Capital Cost Allowance (CCA) over several years — though immediate expensing rules may allow full deduction in the first year.", "Professional development, courses, and certifications related to your business are also deductible, including conferences, workshops, and relevant online courses."] },
        { h: "8-12. Insurance, Meals, Travel & Marketing", p: ["Business insurance premiums are fully deductible. Meals and entertainment with clients are 50% deductible. Business travel including flights, hotels, and car rentals is fully deductible when the trip is primarily for business. Marketing costs — website hosting, advertising, business cards, and social media advertising — are fully deductible."] },
        { h: "13-15. CPP, Health Spending & Bad Debts", p: ["Self-employed Canadians pay both the employee and employer portions of CPP, and the employer portion is deductible on your T1. If you have a Health Spending Account through your corporation, those premiums are deductible. Finally, if a client does not pay you, the bad debt can be written off against your income."] },
      ],
    },
    {
      slug: "northern-residents-deduction-guide",
      title: "Northern Residents Deduction (2026): Who Qualifies and How to Claim It",
      category: "Deductions", readTime: "9 min read", date: "2026-01-14",
      excerpt: "Northern Residents Deduction 2026: who qualifies, the two zones, the residency and travel amounts, and how to claim on Form T2222 and Line 25500 of your T1.",
      intro: "The Northern Residents Deduction (NRD) is one of the most valuable — and most overlooked — tax benefits for Canadians living in northern and remote communities. If you live in a prescribed northern or intermediate zone for at least six consecutive months, you may be entitled to deductions that can save hundreds or even thousands of dollars. This is especially relevant for our clients in Thunder Bay, Timmins, Sudbury, Sault Ste. Marie, Corner Brook, and Grande Prairie.",
      body: [
        { h: "Who Qualifies?", p: ["To claim the NRD, you must have lived in a prescribed northern or intermediate zone for a continuous period of at least six months. The CRA maintains a list of prescribed zones. Northern zones include most of Northern Ontario, much of Newfoundland and Labrador, northern Alberta, and the territories. Intermediate zones cover areas like Sudbury, Sault Ste. Marie, and some parts of southern Newfoundland.", "The deduction has two components: a residency amount and a travel benefit amount. You can claim both if eligible."] },
        { h: "The Residency Amount", p: ["For 2024 tax returns, the basic residency amount is $11.00 per day for northern zone residents and $5.50 per day for intermediate zone residents — approximately $4,015 per year for northern zones and $2,008 for intermediate zones. If you maintain a dwelling and are the only person in that household claiming the deduction, you can claim an additional residency amount, effectively doubling the deduction."] },
        { h: "The Travel Benefit", p: ["If you receive taxable travel benefits from your employer, you may be able to claim a deduction for the cost of up to two trips per household member for personal travel. The CRA provides the lowest return airfare from the nearest designated city as a benchmark.", "For residents of Thunder Bay, the nearest designated city for travel calculations is typically Toronto or Winnipeg. For Corner Brook, it would be Halifax or St. John's. Understanding these benchmarks is crucial for maximizing your travel deduction."] },
        { h: "How to Claim on Your T1", p: ["The NRD is claimed on Line 25500 of your T1 return using Form T2222 (Northern Residents Deductions). You will need to verify your address falls within a prescribed zone, calculate your residency days, and determine your travel benefit amount if applicable. Our team at SH Elevate is experienced with NRD claims for clients across all our service areas."] },
      ],
    },
    {
      slug: "incorporating-business-ontario-guide",
      title: "How to Incorporate a Business in Ontario: A 2026 Step-by-Step Guide",
      category: "Incorporation", readTime: "13 min read", date: "2026-01-07",
      excerpt: "Federal vs. Ontario incorporation in 2026: real government fees (~$380 provincial vs ~$530 federal), NUANS name search, articles, and CRA program accounts explained.",
      intro: "Incorporating a business in Ontario is one of the most impactful financial decisions an entrepreneur can make. A corporation provides limited liability protection, access to the small business tax rate (approximately 12.2% in Ontario), income splitting opportunities, and enhanced credibility with clients and lenders. This guide walks you through every step of the process.",
      body: [
        { h: "Federal vs. Provincial Incorporation", p: ["You can incorporate federally through Corporations Canada or provincially through the Ontario Business Registry. Federal incorporation gives you the right to operate under your corporate name across all provinces but requires extra-provincial registration in each province you do business in. Provincial incorporation is simpler and less expensive but limits your name protection to Ontario.", "For most small businesses operating primarily in Ontario — including those in Thunder Bay, Hamilton, London, and Sudbury — provincial incorporation is sufficient and more cost-effective."] },
        { h: "Step 1: NUANS Name Search", p: ["If you want a named corporation (e.g., \"Smith Consulting Inc.\"), you must first conduct a NUANS (Newly Upgraded Automated Name Search) report. This ensures your proposed name does not conflict with existing business names or trademarks in Canada. A NUANS report costs approximately $13.80 and is valid for 90 days. If you prefer a numbered company, you can skip this step."] },
        { h: "Step 2: File Articles of Incorporation", p: ["Articles of Incorporation are filed with the Ontario Business Registry (for provincial) or Corporations Canada (for federal). You will need to specify the corporation's name, registered office address, number and type of shares, any share transfer restrictions, the number of directors, and the first directors' names and addresses.", "The filing fee is $300 for Ontario provincial incorporation online. Federal incorporation through Corporations Canada costs $200 online."] },
        { h: "Step 3: Register with the CRA", p: ["After incorporation, you need a Business Number (BN) from the CRA. You will also register for program accounts including a corporate income tax account (RC), a payroll account (RP) if you have employees, a GST/HST account (RT) if applicable, and an import/export account (RM) if needed."] },
        { h: "Ongoing Compliance Requirements", p: ["After incorporation, you have annual obligations: filing a T2 corporate tax return within 6 months of year-end, filing an annual return with the Ontario Business Registry, maintaining a corporate minute book, holding annual meetings of shareholders, and keeping proper books and records. Failure to file the annual return can result in the corporation being dissolved."] },
      ],
    },
  ];

  const fmtDate = (d) => new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M9 5l7 7-7 7"/></svg>`;

  // Feature (first article)
  const feat = A[0];
  const featWrap = document.getElementById("blog-feature");
  if (featWrap) {
    featWrap.innerHTML = `
      <a class="blog-feature" href="blog-${feat.slug}.html">
        <div class="bf-media"><img src="images/card2.jpg" alt="${feat.title}" /></div>
        <div class="bf-body">
          <div class="cat">${feat.category} · ${feat.readTime}</div>
          <h2>${feat.title}</h2>
          <p>${feat.excerpt}</p>
          <span class="read">Read the guide ${arrow}</span>
        </div>
      </a>`;
  }

  // Grid (rest)
  grid.innerHTML = A.slice(1).map((a, i) => `
    <a class="blog-card" href="blog-${a.slug}.html" data-reveal data-reveal-delay="${i % 3}">
      <div class="blog-cat"><span class="cat">${a.category}</span><span class="rt">${a.readTime}</span></div>
      <div class="blog-body">
        <h2>${a.title}</h2>
        <p>${a.excerpt}</p>
        <div class="blog-foot"><time>${fmtDate(a.date)}</time><span class="read">Read ${arrow}</span></div>
      </div>
      <div class="blog-accent"></div>
    </a>`).join("");

  // Articles now open as their own pages (blog-<slug>.html) via standard links.
})();
