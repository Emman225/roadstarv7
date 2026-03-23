import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import 'core/theme/app_theme.dart';
import 'core/network/api_client.dart';
import 'features/vehicles/data/datasources/vehicle_remote_data_source.dart';
import 'features/vehicles/data/repositories/vehicle_repository_impl.dart';
import 'core/widgets/main_layout.dart';
//import 'features/vehicles/domain/entities/vehicle.dart';
import 'features/vehicles/presentation/providers/vehicle_provider.dart';
import 'features/home/presentation/pages/home_page.dart';
import 'features/vehicles/presentation/pages/vehicle_list_page.dart';
import 'features/vehicles/presentation/pages/vehicle_details_page.dart';
import 'features/contact/presentation/pages/contact_page.dart';
import 'features/about/presentation/pages/about_page.dart';
import 'features/intro/presentation/pages/splash_screen.dart';
import 'features/contact/data/repositories/contact_repository.dart';
import 'features/contact/presentation/providers/contact_provider.dart';

void main() {
  // Dependency Injection Setup
  final apiClient = ApiClient();
  final vehicleRemoteDataSource = VehicleRemoteDataSourceImpl(apiClient: apiClient);
  final vehicleRepository = VehicleRepositoryImpl(remoteDataSource: vehicleRemoteDataSource);
  final contactRepository = ContactRepository(apiClient: apiClient);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => VehicleProvider(repository: vehicleRepository),
        ),
        ChangeNotifierProvider(
          create: (_) => ContactProvider(repository: contactRepository),
        ),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'Roadstar',
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      routerConfig: _router,
    );
  }
}

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const SplashScreen(),
    ),
    ShellRoute(
      builder: (context, state, child) => MainLayout(child: child),
      routes: [
        GoRoute(
          path: '/home',
          builder: (context, state) => const HomePage(),
        ),
        GoRoute(
          path: '/vehicles',
          builder: (context, state) => const VehicleListPage(),
          routes: [
            GoRoute(
              path: ':id',
              builder: (context, state) => VehicleDetailsPage(
                vehicleId: state.pathParameters['id']!,
              ),
            ),
          ],
        ),
        GoRoute(
          path: '/contact',
          builder: (context, state) {
            final vehicleIdStr = state.uri.queryParameters['vehicleId'];
            final vehicleId = vehicleIdStr != null ? int.tryParse(vehicleIdStr) : null;
            final vehicleName = state.uri.queryParameters['vehicleName'];
            
            return ContactPage(
              vehicleId: vehicleId,
              vehicleName: vehicleName,
            );
          },
        ),
        GoRoute(
          path: '/about',
          builder: (context, state) => const AboutPage(),
        ),
      ],
    ),
  ],
);
