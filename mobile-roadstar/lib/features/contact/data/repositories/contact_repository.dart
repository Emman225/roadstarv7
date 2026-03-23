import '../../../../core/network/api_client.dart';
import '../../../../core/constants/api_constants.dart';

class ContactRepository {
  final ApiClient apiClient;

  ContactRepository({required this.apiClient});

  Future<void> sendMessage(Map<String, dynamic> data) async {
    await apiClient.post(ApiConstants.contactEndpoint, data: data);
  }

  Future<void> sendReservation(Map<String, dynamic> data) async {
    await apiClient.post(ApiConstants.reservationEndpoint, data: data);
  }
}
