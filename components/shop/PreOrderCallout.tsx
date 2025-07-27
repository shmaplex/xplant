"use client";

export default function PreOrderCallout() {
  return (
    <div className="max-w-full mx-auto mb-8 px-4">
      <div className="bg-white border border-black/10 rounded-xl p-4 sm:p-5 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF4E50]/10 via-[#F9D423]/10 to-[#FF6E7F]/10 pointer-events-none rounded-xl" />
        <h3 className="text-sm sm:text-base font-semibold text-[#3F3829] relative z-10">
          🌱 Pre-Order Notice
        </h3>
        <p className="text-sm text-[#5D5345] mt-1 relative z-10">
          Our farm is just getting started! <strong>Worms</strong> and{" "}
          <strong>castings</strong> are available for pre-order now and will
          begin shipping in <strong>September</strong>.
          <br />
          There’s a <strong>100% money-back guarantee</strong> if anything
          changes.
        </p>
      </div>
    </div>
  );
}
