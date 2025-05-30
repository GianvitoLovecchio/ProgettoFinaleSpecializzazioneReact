export default function Footer() {
  return (
    <footer className="bg-[#d8e2dc] text-black py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-base">
          © {new Date().getFullYear()} Il Tuo Nome o Azienda. Tutti i diritti riservati.
        </p>
        <p className="text-sm text-gray-600 mt-2">
          <a href="" className="hover:underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="" className="hover:underline">
            Termini e Condizioni
          </a>
        </p>
      </div>
    </footer>
  );
}
