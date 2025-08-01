"use client";

export default function PreOrderCallout() {
  return (
    <div className="max-w-full mx-auto mb-8 px-4">
      <div className="bg-milk-bio border border-moss-shadow rounded-xl p-4 sm:p-5 shadow-md relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br
            from-future-lime/10
            via-psybeam-purple/10
            to-future-lime/10
            pointer-events-none rounded-xl"
        />
        <h3 className="text-sm sm:text-base font-semibold text-moss-shadow relative z-10">
          🌱 Pre-Order Notice
        </h3>
        <p className="text-sm text-[#5C5138] mt-1 relative z-10">
          Our tissue culture lab is actively developing organic culture mediums,
          explants, and additives.
          <br />
          All orders are currently pre-orders; shipping will begin as products
          are finalized.
          <br />
          We offer a <strong>100% money-back guarantee</strong> if plans change.
          <br />
          Thank you for supporting sustainable plant propagation.
        </p>
      </div>
    </div>
  );
}
