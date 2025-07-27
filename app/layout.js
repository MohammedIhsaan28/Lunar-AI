import { Inter,Bricolage_Grotesque} from "next/font/google";

import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";


const inter = Bricolage_Grotesque({
  variable: "--font-bricolage_grotesque",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lunar AI",
  description: "AI Chatbot for simple tasks",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AppContextProvider>
        <html lang="en">
          <body className={`${inter.className} antialiased`}>
            <Toaster toastOptions={
              { success : {style:{ background: "black", color:"white"}},
              error:{style:{background: "black", color:"white"}}
            }
              } />
            {children}</body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
