import Link from "next/link";
const links = [{href:'/', label: 'Home'}, 
     {href:'/pageone', label: 'Page One'},
     {href:'/pagetwo', label: 'Page Two'}
]
const DashboardLayout = ({ children }) => {
     return (
          <div>
               <header>
                    <nav>
                         <li></li>
                    </nav>
               </header>
               <h1>dash</h1>
               <div> {children}</div>
               </div>

               )

}
               export default DashboardLayout;