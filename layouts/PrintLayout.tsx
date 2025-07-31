export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-white print:bg-white print:p-0 print:m-0">
        {children}
      </body>
    </html>
  );
}
