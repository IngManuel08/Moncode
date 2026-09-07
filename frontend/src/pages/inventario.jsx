import SidebarA from "../components/Sidebar";
import { ProductsInventoryGrid } from "../components/ProductsInventoryGrid"

function inventario() {
    return (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
            <SidebarA />
            <main className="ml-0 md:ml-32 mt-20 px-4 md:px-8 py-8">
                <ProductsInventoryGrid />
            </main>
        </div>
    )
}

export default inventario