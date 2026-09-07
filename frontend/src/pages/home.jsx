/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Cookies from "js-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function Home() {
  const [novedades, setNovedades] = useState([]);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Sidebar />

      <main className="ml-32 mt-20 p-8">
        {/* NOVEDADES */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            NOVEDADES
          </h2>

          <div className="w-medium">
            {novedades.length === 0 ? (
              <Swiper
                direction="vertical"
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                spaceBetween={20}
                slidesPerView={1}
                className="w-full h-[500px] bg-black rounded-3xl overflow-hidden"
              >
                <SwiperSlide>
                  <div className="w-medium h-full bg-black/60">
                    <img
                      src="/img/cpu.jpg"
                      alt="CPU"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-medium h-full bg-black/60">
                    <img
                      src="/img/nvidia-rtx-5000.jpg"
                      alt="Nvidia"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-medium h-full bg-black/60">
                    <img
                      src="/img/gabinete.jpg"
                      alt="Otra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-medium h-full bg-black/60">
                    <img
                      src="/img/Ultima actualizacion de ASUS.jpg"
                      alt="Otra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="w-medium h-full bg-black/60">
                    <img
                      src="/img/R.png"
                      alt="Otra"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            ) : (
              novedades.map((p) => (
                <div
                  key={p._id}
                  className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />

                  <div className="absolute top-6 right-6 bg-black/70 text-yellow-400 px-6 py-2 rounded-xl text-2xl font-bold">
                    ${p.price}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h3 className="text-white text-xl font-light">{p.name}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* NOTICIAS */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            NOTICIAS
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
              <img
                src="/img/nvidia-rtx-5000.jpg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                <h3 className="text-white text-xl font-light text-center">
                  CES 2025: Nvidia presenta la serie GeForce RTX 5000
                </h3>
              </div>
            </div>

            <div className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer">
              <img src="/img/cpu.jpg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-8">
                <h3 className="text-white text-xl font-light text-center">
                  Nuevos récords de GHz, pero el rendimiento sigue estancado
                </h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
