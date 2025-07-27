import LegalPage from "@/layouts/LegalPage";

export default function ShippingPolicy() {
  return (
    <LegalPage title="Shipping Policy">
      <p>
        Thank you for supporting <strong>ShmaplexPlant</strong>. Below
        you&rsquo;ll find detailed information about how we handle domestic
        shipping within South Korea.
      </p>

      <h2 className="text-lg font-semibold mt-6">📦 Order Processing</h2>
      <p>
        Orders are typically processed within{" "}
        <strong>2&ndash;3 business days</strong>. Processing time may vary
        during high-demand periods, holidays, or if otherwise stated at
        checkout. Orders placed after 5 PM KST or on weekends will begin
        processing the next business day.
      </p>

      <h2 className="text-lg font-semibold mt-6">
        🚚 Shipping Methods &amp; Carriers
      </h2>
      <p>
        We currently offer{" "}
        <strong>domestic shipping within South Korea only</strong>. All orders
        are shipped using <strong>CJ Logistics</strong> or{" "}
        <strong>Korea Post</strong>, depending on package size, destination, and
        delivery requirements.
      </p>
      <p>
        Shipping fees are calculated at checkout and will vary depending on your
        location and the total weight of your order.
      </p>

      <h2 className="text-lg font-semibold mt-6">📍 Address Accuracy</h2>
      <p>
        Please double-check your shipping address before placing an order.{" "}
        <strong>ShmaplexPlant</strong> is not responsible for orders delayed or
        lost due to incorrect or incomplete shipping information.
      </p>
      <p>
        If a package is returned to us due to an incorrect address, you will be
        contacted and given the option to pay for reshipment.
      </p>

      <h2 className="text-lg font-semibold mt-6">📮 Delivery Estimates</h2>
      <p>
        Typical delivery time after dispatch is{" "}
        <strong>1&ndash;3 business days</strong>, depending on the delivery
        location and courier performance. Remote areas may require additional
        time.
      </p>
      <p>
        Please note that delivery times are estimates and not guaranteed.
        External factors such as weather, holidays, or courier delays may affect
        your delivery.
      </p>

      <h2 className="text-lg font-semibold mt-6">
        📦 Lost, Delayed, or Damaged Packages
      </h2>
      <p>
        Once your package leaves our hands, it becomes the responsibility of the
        shipping carrier. If your package is significantly delayed or appears
        lost, please reach out to the relevant courier (CJ Logistics or Korea
        Post) with your tracking number.
      </p>
      <p>
        If you require assistance with tracking, feel free to contact us.
        However, we are unable to offer replacements or refunds for lost
        packages confirmed as delivered.
      </p>

      <h2 className="text-lg font-semibold mt-6">
        ❗ Stolen or Misplaced Deliveries
      </h2>
      <p>
        Please ensure that someone is available to receive the package or that
        you have a secure delivery location. We are not responsible for stolen
        or misplaced items that have been marked as &ldquo;Delivered&rdquo; by
        the carrier.
      </p>

      <h2 className="text-lg font-semibold mt-6">✉️ Questions?</h2>
      <p>
        If you have any questions or need help with your order, feel free to
        contact us at{" "}
        <a href="mailto:contact@shmaplexplant.com">contact@shmaplexplant.com</a>{" "}
        or call us at{" "}
        <a href="tel:+821012345678">&#43;82&nbsp;10&#8209;1234&#8209;5678</a>.
      </p>
    </LegalPage>
  );
}
