import { ThemeProvider } from "next-themes";
import "react-medium-image-zoom/dist/styles.css";
import "./globals.css";
import Aside from "@/components/Aside";
import Navbar from "@/components/Navbar";
import { OrderContext } from "@/contexts/OrderContext";
import Footer from "@/components/Footer";
import { UserContext } from "@/contexts/UserContext";
import { Toaster } from "sonner";
import { EditProductContext } from "@/contexts/EditProductContext";
import { MenuContext } from "@/contexts/MenuContext";
import { AuthContext } from "@/contexts/AuthContext";
import AuthWrapper from "@/components/AuthWrapper";

export const metadat = {
  title: {
    default: "Overview | Control Panel",
    template: "%s | Omni Panel", 
  },
  description: "Advanced control panel providing tools for inventory management, account monitoring, and data security.",
  icons: {
    icon: "/icon.png", 
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}
) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
            <AuthContext>
            <AuthWrapper>


            <MenuContext>
              <OrderContext>
                <UserContext>
                  <EditProductContext>
                    <Toaster position="top-center" richColors />
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <div className="flex flex-1">
                        <Aside />
                        <main className="flex-1 w-full transition-all duration-300">
                          {children}
                        </main>
                      </div>
                      <Footer />
                    </div>
                  </EditProductContext>
                </UserContext>
              </OrderContext>
            </MenuContext>
            </AuthWrapper>
            </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}