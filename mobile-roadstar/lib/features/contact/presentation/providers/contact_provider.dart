import 'package:flutter/material.dart';
import '../../data/repositories/contact_repository.dart';

class ContactProvider extends ChangeNotifier {
  final ContactRepository repository;

  bool _isLoading = false;
  String? _error;
  bool _isSuccess = false;

  ContactProvider({required this.repository});

  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isSuccess => _isSuccess;

  Future<void> sendMessage({
    required String name,
    required String email,
    required String phone,
    required String message,
  }) async {
    _isLoading = true;
    _error = null;
    _isSuccess = false;
    notifyListeners();

    try {
      final data = {
        'nom': name,
        'email': email,
        'telephone': phone,
        'message': message,
      };
      await repository.sendMessage(data);
      _isSuccess = true;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> sendReservation({
    required String name,
    required String email,
    required String phone,
    required String message,
    int? vehicleId,
    String? vehicleName,
  }) async {
    _isLoading = true;
    _error = null;
    _isSuccess = false;
    notifyListeners();

    try {
      final data = {
        'nom': name,
        'email': email,
        'telephone': phone,
        'message': message,
        if (vehicleId != null) 'vehicle_id': vehicleId,
        if (vehicleName != null) 'vehicle_name': vehicleName,
      };
      await repository.sendReservation(data);
      _isSuccess = true;
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  void resetState() {
    _isLoading = false;
    _error = null;
    _isSuccess = false;
    notifyListeners();
  }
}
