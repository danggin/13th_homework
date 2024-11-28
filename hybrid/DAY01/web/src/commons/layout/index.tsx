import React from "react";
import Header from "./header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ flex: 1 }} className="px-[20px]">
      <Header />
      <>{children}</>
    </div>
  );
}
