import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EricTodo - 待办事项",
  description: "简洁优雅的待办事项管理工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
