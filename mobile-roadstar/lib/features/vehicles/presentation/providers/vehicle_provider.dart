import 'package:flutter/material.dart';
import '../../domain/entities/vehicle.dart';
import '../../domain/repositories/vehicle_repository.dart';

class VehicleProvider extends ChangeNotifier {
  final VehicleRepository repository;

  List<Vehicle> _vehicles = [];
  bool _isLoading = false;
  String? _error;
  Vehicle? _selectedVehicle;

  VehicleProvider({required this.repository});

  // Search and Filter State
  String _searchQuery = '';
  String _selectedCategory = 'Tous';

  List<Vehicle> get vehicles {
    if (_searchQuery.isEmpty && _selectedCategory == 'Tous') {
      return _vehicles;
    }

    return _vehicles.where((vehicle) {
      final matchesSearch = _searchQuery.isEmpty ||
          vehicle.brand.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          vehicle.model.toLowerCase().contains(_searchQuery.toLowerCase());
          
      final matchesCategory = _selectedCategory == 'Tous' ||
          (vehicle.category?.toUpperCase() == _selectedCategory.toUpperCase());

      return matchesSearch && matchesCategory;
    }).toList();
  }

  List<Vehicle> get featuredVehicles => _vehicles.where((v) => v.isFeatured).take(5).toList();
  
  // Available categories derived from data
  List<String> get categories {
    final cats = _vehicles
        .map((v) => v.category?.toUpperCase() ?? 'AUTRE')
        .toSet()
        .toList();
    cats.sort();
    return ['Tous', ...cats];
  }

  String get selectedCategory => _selectedCategory;

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  bool get isLoading => _isLoading;
  String? get error => _error;
  Vehicle? get selectedVehicle => _selectedVehicle;

  Future<void> fetchVehicles() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _vehicles = await repository.getVehicles();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> fetchVehicleById(int id) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _selectedVehicle = await repository.getVehicleById(id);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
