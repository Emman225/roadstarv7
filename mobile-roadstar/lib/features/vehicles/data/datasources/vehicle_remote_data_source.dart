import '../../../../core/constants/api_constants.dart';
import '../../../../core/network/api_client.dart';
import '../models/vehicle_model.dart';

abstract class VehicleRemoteDataSource {
  Future<List<VehicleModel>> getVehicles();
  Future<VehicleModel> getVehicleById(int id);
}

class VehicleRemoteDataSourceImpl implements VehicleRemoteDataSource {
  final ApiClient apiClient;

  VehicleRemoteDataSourceImpl({required this.apiClient});

  @override
  Future<List<VehicleModel>> getVehicles() async {
    final response = await apiClient.get(ApiConstants.vehiclesEndpoint);
    // Assuming response.data is List or contains 'data' key as List
    final List<dynamic> data = (response.data is Map && response.data['data'] != null) 
        ? response.data['data'] 
        : response.data;
        
    return data.map((json) => VehicleModel.fromJson(json)).toList();
  }

  @override
  Future<VehicleModel> getVehicleById(int id) async {
    final response = await apiClient.get('${ApiConstants.vehiclesEndpoint}/$id');
    final data = (response.data is Map && response.data['data'] != null) 
        ? response.data['data'] 
        : response.data;
    return VehicleModel.fromJson(data);
  }
}
