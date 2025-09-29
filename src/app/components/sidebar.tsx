import Link from "next/link";

export function Sidebar() {
  const menuItems = [
    { title: "Dashboard", href: "/dashboard", icon: "fa-solid" },
    { title: "พนักงานขาย", href: "/dashboard/users", icon: "fa-solid" },
    {
      title: "บันทึกการซ่อม",
      href: "/dashboard/repair-record",
      icon: "fa-solid",
    },
    {
      title: "สถานะการซ่อม",
      href: "/dashboard/repair-status",
      icon: "fa-gear",
    },
    {
      title: "สถิติการซ่อมของช่าง",
      href: "/dashboard/reports",
      icon: "fa-solid",
    },
    {
      title: "รายงานรายได้",
      href: "/dashboard/mecthanic-report",
      icon: "fa-solid",
    },
    { title: "ทะเบียนวัสดุ", href: "/dashboard/devices", icon: "fa-solid" },
    { title: "ข้อมูลร้าน", href: "/dashboard/company", icon: "fa-solid" },

    { title: "ออกจากระบบ", href: "/logout", icon: "fa-solid" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <i className="fa-solid fa-user text-2xl mr-5"></i>
        <span className="text-white font-bold text-lg">Admin Panel</span>
      </div>
      <nav className="sidebar-nav bg-gray-50 p-4 rounded-tl-3xl ml-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.title} className="sidebar-item">
              <Link href={item.href} className="text-white">
                <i className={item.icon + " mr-2 w-5"}></i>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
