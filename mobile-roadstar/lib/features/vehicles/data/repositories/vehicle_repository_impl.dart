import '../../domain/entities/vehicle.dart';
import '../../domain/repositories/vehicle_repository.dart';
import '../datasources/vehicle_remote_data_source.dart';

class VehicleRepositoryImpl implements VehicleRepository {
  final VehicleRemoteDataSource remoteDataSource;

  VehicleRepositoryImpl({required this.remoteDataSource});

  @override
  Future<List<Vehicle>> getVehicles() async {
    try {
      final vehicleModels = await remoteDataSource.getVehicles();
      return vehicleModels;
    } catch (e) {
      throw Exception('Failed to load vehicles: $e');
    }
  }

  @override
  Future<Vehicle> getVehicleById(int id) async {
    try {
      final vehicleModel = await remoteDataSource.getVehicleById(id);
      return vehicleModel;
    } catch (e) {
      throw Exception('Failed to load vehicle details: $e');
    }
  }
}
