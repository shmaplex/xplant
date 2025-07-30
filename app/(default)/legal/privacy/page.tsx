import LegalPage from "@/layouts/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        At <strong>ShmaplexPlant</strong>, we are committed to protecting your
        personal information and your right to privacy. This Privacy Policy
        outlines what information we collect, how we use it, and the choices you
        have regarding your data.
      </p>

      <h2 className="text-lg font-semibold mt-6">🔍 Information We Collect</h2>
      <p>
        We collect information you provide directly to us when you place an
        order, sign up for our newsletter, or contact us. This may include your
        name, email address, phone number, shipping address, payment
        information, and any messages you send us.
      </p>
      <p>
        We also automatically collect certain data through cookies and analytics
        tools when you browse our site, such as IP address, browser type,
        referring URLs, and pages visited. This helps us improve your shopping
        experience.
      </p>

      <h2 className="text-lg font-semibold mt-6">💾 How We Use Your Data</h2>
      <p>We use your information to:</p>
      <ul className="list-disc ml-6 mt-2">
        <li>Process and fulfill your orders</li>
        <li>Respond to your customer support requests</li>
        <li>Send order confirmations and updates</li>
        <li>Improve and optimize our website and services</li>
        <li>Send occasional marketing emails (only if you opt in)</li>
      </ul>

      <h2 className="text-lg font-semibold mt-6">
        🛡️ How We Protect Your Data
      </h2>
      <p>
        Your data is stored securely and handled with care. We use encryption,
        secure payment gateways, and data minimization practices to keep your
        information safe. We never sell or share your data with third parties
        except as necessary to fulfill your order (e.g., payment processors,
        shipping carriers).
      </p>

      <h2 className="text-lg font-semibold mt-6">🍪 Cookies</h2>
      <p>
        Like most websites, we use cookies to enhance your experience and
        understand how you use our site. Cookies help us remember your cart,
        analyze site traffic, and improve performance. You can adjust your
        browser settings to disable cookies at any time.
      </p>

      <h2 className="text-lg font-semibold mt-6">📬 Email &amp; Marketing</h2>
      <p>
        If you opt into our newsletter, we may send you occasional updates,
        offers, or news about ShmaplexPlant. You can unsubscribe at any time
        using the link provided in our emails.
      </p>

      <h2 className="text-lg font-semibold mt-6">
        👶 Children&rsquo;s Privacy
      </h2>
      <p>
        Our website is not intended for children under the age of 13, and we do
        not knowingly collect personal information from children. If you believe
        a child has provided us with personal data, please contact us so we can
        remove it.
      </p>

      <h2 className="text-lg font-semibold mt-6">🌏 International Visitors</h2>
      <p>
        We only ship and operate within South Korea. If you access this site
        from outside South Korea, please be aware that your information may be
        transferred and stored locally to comply with Korean regulations.
      </p>

      <h2 className="text-lg font-semibold mt-6">⚖️ Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information at any time by contacting us. We will respond as soon as
        reasonably possible.
      </p>

      <h2 className="text-lg font-semibold mt-6">📄 Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or legal obligations. The effective date at the top of
        the page will always be the most current version.
      </p>

      <h2 className="text-lg font-semibold mt-6">✉️ Contact Us</h2>
      <p>
        If you have any questions about this policy or how we handle your data,
        you can reach us at{" "}
        <a href="mailto:team@shmaplex.com">team@shmaplex.com</a> or call us at{" "}
        <a href="tel:+8201042012407">&#43;82&nbsp;10&#8209;4201&#8209;2407</a>.
      </p>
    </LegalPage>
  );
}
