
import { useEffect, useState } from "react"

import axiosInstance from "../api/axiosInstance"
import { ProductInventoryCard } from "./ProductInventoryCard"

interface Product {
  _id: string
  name: string
  price: number
  quantity: number
  description: string
  category: string
  image: string
  user: string
}

export function ProductsInventoryGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [modalType, setModalType] = useState<"add" | "edit" | "delete" | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState("")

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/products")
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError("Error al cargar los productos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const openModal = (type: "add" | "edit" | "delete", product: Product | null = null) => {
    setModalType(type)
    setSelectedProduct(product)
    setFormData(type === "edit" && product ? product : {})


  }

  const closeModal = () => {
    setModalType(null)
    setSelectedProduct(null)
    setFormData({})
    setDeleteConfirm("")
    setImageFile(null)
  }

  const handleAddProduct = async () => {
    const data = new FormData()
    Object.keys(formData).forEach((k) => data.append(k, formData[k]))
    if (imageFile) data.append("image", imageFile)
    await axiosInstance.post("/products", data)
    fetchProducts()
    closeModal()
  }

  const handleUpdateWithoutImage = async () => {
    await axiosInstance.put(`products/updatewithoutimage/${selectedProduct?._id}`, formData)
    fetchProducts()
    closeModal()
  }

  const handleUpdateWithImage = async () => {
    const data = new FormData()
    Object.keys(formData).forEach((k) => data.append(k, formData[k]))
    if (imageFile) data.append("image", imageFile)

    await axiosInstance.put(`products/updatewithimage/${selectedProduct?._id}`, data)
    fetchProducts()
    closeModal()
  }

  const handleDeleteProduct = async () => {
    if (deleteConfirm !== "DELETE") return
    await axiosInstance.delete(`/products/${selectedProduct?._id}`)
    fetchProducts()
    closeModal()
  }

  if (loading) return <p className="text-black">Cargando...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">Inventario</h1>
        <button
          onClick={() => openModal("add")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all active:scale-95"
        >
          + Agregar Producto
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductInventoryCard
            key={p._id}
            product={p}
            onEdit={() => openModal("edit", p)}
            onDelete={() => openModal("delete", p)}
          />
        ))}
      </div>

      {/* MODAL ADD/EDIT */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center px-4 z-50">
          <div className="bg-white dark:bg-black shadow-2xl rounded-2xl p-8 w-full max-w-lg animate-fadeIn transition-colors border border-gray-100 dark:border-white/10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {modalType === "add" ? "Agregar Producto" : "Editar Producto"}
            </h2>

            <div className="space-y-4">
              <input
                className="w-full px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="Nombre"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                  type="number"
                  placeholder="Precio"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />

                <input
                  className="w-full px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                  type="number"
                  placeholder="Cantidad"
                  value={formData.quantity || ""}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <textarea
                className="w-full px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 min-h-[100px]"
                placeholder="Descripción"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <input
                className="w-full px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400"
                placeholder="Categoría"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />

              <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Imagen del Producto</label>
                <input
                  type="file"
                  className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 transition-all"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={closeModal} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Cancelar
              </button>

              {modalType === "add" ? (
                <button
                  onClick={handleAddProduct}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-lg hover:shadow-green-500/30 transition-all"
                >
                  Guardar
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateWithoutImage}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Actualizar
                  </button>

                  <button
                    onClick={handleUpdateWithImage}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-purple-500/30 transition-all"
                  >
                    Actualizar con Imagen
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
      {modalType === "delete" && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center px-4 z-50">
          <div className="bg-white dark:bg-black shadow-2xl rounded-2xl p-8 w-full max-w-md text-gray-900 dark:text-white transition-colors border border-red-100 dark:border-red-900/30">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Eliminar Producto</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Esta acción no se puede deshacer. Escribe <strong className="text-gray-900 dark:text-white font-mono bg-[#050505] dark:bg-gray-800 px-2 py-1 rounded">DELETE</strong> para confirmar.
            </p>

            <input
              className="w-full mt-6 px-4 py-2 rounded-xl text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 outline-none transition-all font-mono text-center uppercase"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="Escribe DELETE"
            />

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={closeModal} className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-medium transition-colors">
                Cancelar
              </button>

              <button
                onClick={handleDeleteProduct}
                disabled={deleteConfirm !== "DELETE"}
                className={`px-6 py-2 rounded-xl text-white font-medium shadow-lg transition-all ${deleteConfirm === "DELETE" ? "bg-red-600 hover:bg-red-700 hover:shadow-red-500/30" : "bg-red-300 dark:bg-red-900/50 cursor-not-allowed"
                  }`}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}