import '../../domain/entities/vehicle.dart';

class VehicleModel extends Vehicle {
  const VehicleModel({
    required super.id,
    required super.brand,
    required super.model,
    required super.year,
    required super.licensePlate,
    required super.color,
    required super.mileage,
    required super.fuelType,
    required super.transmission,
    required super.seats,
    required super.dailyRate,
    required super.status,
    required super.isFeatured,
    super.description,
    super.category,
    super.image,
  });

  factory VehicleModel.fromJson(Map<String, dynamic> json) {
    return VehicleModel(
      id: json['id'] is int ? json['id'] : int.tryParse(json['id'].toString()) ?? 0,
      brand: json['brand'] ?? '',
      model: json['model'] ?? '',
      year: json['year'] is int ? json['year'] : int.tryParse(json['year'].toString()) ?? 0,
      licensePlate: json['license_plate'] ?? '',
      color: json['color'] ?? '',
      mileage: json['mileage'] is int ? json['mileage'] : int.tryParse(json['mileage'].toString()) ?? 0,
      fuelType: json['fuel_type'] ?? '',
      transmission: json['transmission'] ?? '',
      seats: json['seats'] is int ? json['seats'] : int.tryParse(json['seats'].toString()) ?? 0,
      dailyRate: json['daily_rate'] is num 
          ? (json['daily_rate'] as num).toDouble() 
          : double.tryParse(json['daily_rate'].toString()) ?? 0.0,
      status: json['status'] ?? 'available', // Default to available
      isFeatured: json['is_featured'] == 1 || json['is_featured'] == true || json['is_featured'] == 'true',
      description: json['description'],
      category: json['category'],
      image: json['image'] ?? json['image_url'], // Support variants
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'brand': brand,
      'model': model,
      'year': year,
      'license_plate': licensePlate,
      'color': color,
      'mileage': mileage,
      'fuel_type': fuelType,
      'transmission': transmission,
      'seats': seats,
      'daily_rate': dailyRate,
      'status': status,
      'is_featured': isFeatured,
      'description': description,
      'category': category,
      'image': image,
    };
  }
}
