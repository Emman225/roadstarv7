import { useState } from 'react';
import { Users, Gauge, Fuel } from 'lucide-react';
import Button from '../ui/Button';
import PropTypes from 'prop-types';
import ReservationModal from '../ui/ReservationModal';

export default function VehicleCard({ vehicle }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col">
                <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                        {vehicle.type}
                    </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{vehicle.name}</h3>

                    <div className="grid grid-cols-3 gap-2 mb-6 mt-auto pt-4">
                        <div className="flex flex-col items-center justify-center p-2 rounded bg-neutral-50/80 border border-neutral-100">
                            <Users size={16} className="text-primary mb-1" />
                            <span className="text-xs text-neutral-600">{vehicle.passengers} Places</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded bg-neutral-50/80 border border-neutral-100">
                            <Gauge size={16} className="text-primary mb-1" />
                            <span className="text-xs text-neutral-600">{vehicle.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-2 rounded bg-neutral-50/80 border border-neutral-100">
                            <Fuel size={16} className="text-primary mb-1" />
                            <span className="text-xs text-neutral-600">{vehicle.fuel}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-100 pt-5 mt-auto">
                        <div>
                            <div className="text-sm text-neutral-500 mb-0.5">À partir de</div>
                            <div className="text-xl font-bold text-gray-900">{vehicle.price} <span className="text-xs font-normal text-neutral-500">/jour</span></div>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)} variant="primary" className="px-6 py-2.5 text-sm">
                            Réserver
                        </Button>
                    </div>
                </div>
            </div>

            <ReservationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                vehicleName={vehicle.name}
            />
        </>
    );
}

VehicleCard.propTypes = {
    vehicle: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        passengers: PropTypes.number.isRequired,
        transmission: PropTypes.string.isRequired,
        fuel: PropTypes.string.isRequired,
    }).isRequired
};
