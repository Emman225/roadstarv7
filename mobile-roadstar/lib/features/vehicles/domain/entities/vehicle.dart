import 'package:equatable/equatable.dart';

class Vehicle extends Equatable {
  final int id;
  final String brand;
  final String model;
  final int year;
  final String licensePlate;
  final String color;
  final int mileage;
  final String fuelType;
  final String transmission;
  final int seats;
  final double dailyRate;
  final String status;
  final bool isFeatured;
  final String? description;
  final String? category;
  final String? image;

  const Vehicle({
    required this.id,
    required this.brand,
    required this.model,
    required this.year,
    required this.licensePlate,
    required this.color,
    required this.mileage,
    required this.fuelType,
    required this.transmission,
    required this.seats,
    required this.dailyRate,
    required this.status,
    required this.isFeatured,
    this.description,
    this.category,
    this.image,
  });

  @override
  List<Object?> get props => [
        id,
        brand,
        model,
        year,
        licensePlate,
        color,
        mileage,
        fuelType,
        transmission,
        seats,
        dailyRate,
        status,
        isFeatured,
        description,
        category,
        image,
      ];
}
