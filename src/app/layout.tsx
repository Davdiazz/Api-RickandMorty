import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
  description: "Browse all Rick and Morty characters using the Rick and Morty GraphQL API",
  keywords: ["Rick and Morty", "characters", "API", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* 🔐 ÚNICO CAMBIO: Envolver children con AuthProvider */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

/*
📝 EXPLICACIÓN DE LOS CAMBIOS:

1. **Import añadido**: 
   - import { AuthProvider } from "@/context/AuthContext";

2. **Wrapper añadido**:
   - <AuthProvider>{children}</AuthProvider>
   - Envuelve todo el contenido de la app
   - Proporciona el contexto de autenticación a toda la aplicación

3. **Todo lo demás permanece igual**:
   - Metadata sin cambios
   - className "antialiased" conservado
   - Estructura HTML igual

⚠️ IMPORTANTE: 
   - Este es el ÚNICO cambio necesario en layout.tsx
   - No necesitas modificar nada más aquí
*/