import toyotaPradoImg from '../assets/images/IMG_20230130_100803.jpg';

export const vehicles = [
    {
        id: 1,
        name: 'Range Rover Sport',
        type: 'SUV Premium',
        price: '150 000 FCFA',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop',
        passengers: 5,
        transmission: 'Auto',
        fuel: 'Diesel',
        featured: true
    },
    {
        id: 2,
        name: 'Mercedes-Benz S-Class',
        type: 'Berline Luxe',
        price: '200 000 FCFA',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop',
        passengers: 4,
        transmission: 'Auto',
        fuel: 'Essence',
        featured: true
    },
    {
        id: 3,
        name: 'Toyota Land Cruiser V8',
        type: 'SUV 4x4',
        price: '120 000 FCFA',
        image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop',
        passengers: 7,
        transmission: 'Auto',
        fuel: 'Diesel',
        featured: true
    },
    {
        id: 4,
        name: 'Toyota Prado',
        type: 'SUV Confort',
        price: '80 000 FCFA',
        image: toyotaPradoImg,
        passengers: 7,
        transmission: 'Auto',
        fuel: 'Diesel',
        featured: false
    },
    {
        id: 5,
        name: 'Hyundai Santa Fe',
        type: 'SUV Urbain',
        price: '60 000 FCFA',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
        passengers: 5,
        transmission: 'Auto',
        fuel: 'Essence',
        featured: false
    },
    {
        id: 6,
        name: 'Kia Sportage',
        type: 'SUV Compact',
        price: '50 000 FCFA',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
        passengers: 5,
        transmission: 'Auto',
        fuel: 'Essence',
        featured: false
    }
];
