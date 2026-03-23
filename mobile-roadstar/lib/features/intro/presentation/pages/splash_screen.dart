import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import '../../../../core/services/license_service.dart';
import '../../../vehicles/presentation/providers/vehicle_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _initApp();
  }

  Future<void> _initApp() async {
    // 1. VÉRIFICATION DE LA LICENCE
    final isValid = await LicenseService.isLicenseValid();
    
    if (!isValid && mounted) {
      LicenseService.showExpiryDialog(context);
      return; // On arrête l'initialisation ici
    }

    // 2. Initialisation normale
    final minSplashTime = Future.delayed(const Duration(seconds: 2));
    
    try {
      await context.read<VehicleProvider>().fetchVehicles();
    } catch (e) {
      // Continue anyway
    }

    await minSplashTime;

    if (mounted) {
      context.go('/home');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo Animation (Simple Scale for now)
            TweenAnimationBuilder<double>(
              tween: Tween(begin: 0.0, end: 1.0),
              duration: const Duration(seconds: 1),
              curve: Curves.elasticOut,
              builder: (context, value, child) {
                return Transform.scale(
                  scale: value,
                    child: Image.asset(
                      'assets/icons/New_logo-RoadStar.png',
                      width: 150,
                      height: 150,
                      fit: BoxFit.contain,
                    ),
                );
              },
            ),
            const SizedBox(height: 24),
            Text(
              "ROADSTAR",
              style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                fontWeight: FontWeight.w900,
                letterSpacing: 2,
                color: Colors.black,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              "Votre partenaire pour la route.",
              style: TextStyle(
                letterSpacing: 4,
                color: Colors.grey,
                fontSize: 12,
              ),
            ),
            const SizedBox(height: 48),
            const CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}
