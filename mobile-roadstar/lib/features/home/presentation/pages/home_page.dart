import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../../vehicles/presentation/providers/vehicle_provider.dart';
import '../../../vehicles/presentation/widgets/vehicle_card.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      // Ensure vehicles are loaded for featured section
      final provider = context.read<VehicleProvider>();
      if (provider.vehicles.isEmpty) {
        provider.fetchVehicles();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverPersistentHeader(
            pinned: true,
            delegate: _HeaderDelegate(
              minHeight: 80,
              maxHeight: 320,
            ),
          ),
          
          SliverToBoxAdapter(
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.white,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "L'excellence à chaque kilomètre",
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: const Color(0xFFFF5722),
                          ),
                        ),
                        const SizedBox(height: 10),
                        const Text(
                          "Découvrez notre flotte de véhicules premium pour vos déplacements à Abidjan.",
                          style: TextStyle(fontSize: 16, color: Colors.grey),
                        ),
                        const SizedBox(height: 30),
                        
                        // Action Buttons
                        Row(
                          children: [
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () => context.go('/vehicles'),
                                style: ElevatedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                  backgroundColor: const Color(0xFFFF5722),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                                child: const Text(
                                  'VOIR NOS VÉHICULES',
                                  style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
                                ),
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: OutlinedButton(
                                onPressed: () => context.push('/contact'),
                                style: OutlinedButton.styleFrom(
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                  side: const BorderSide(color: Color(0xFFFF5722)),
                                  foregroundColor: const Color(0xFFFF5722),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                                child: const Text(
                                  'NOUS CONTACTER',
                                  style: TextStyle(fontWeight: FontWeight.bold),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),

                  // Featured Vehicles Section
                  Consumer<VehicleProvider>(
                    builder: (context, provider, child) {
                      if (provider.isLoading && provider.vehicles.isEmpty) {
                        return const Center(
                          child: Padding(
                            padding: EdgeInsets.all(20.0),
                            child: CircularProgressIndicator(),
                          ),
                        );
                      }

                      final featured = provider.featuredVehicles;
                      if (featured.isEmpty) return const SizedBox.shrink();

                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 20.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Populaires",
                                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                TextButton(
                                  onPressed: () => context.go('/vehicles'),
                                  child: const Text("Voir tout"),
                                )
                              ],
                            ),
                          ),
                          const SizedBox(height: 10),
                          SizedBox(
                            height: 280,
                            child: ListView.builder(
                              padding: const EdgeInsets.symmetric(horizontal: 16),
                              scrollDirection: Axis.horizontal,
                              itemCount: featured.length,
                              itemBuilder: (context, index) {
                                final vehicle = featured[index];
                                return Container(
                                  width: 200,
                                  margin: const EdgeInsets.only(right: 16, bottom: 10),
                                  child: VehicleCard(
                                    vehicle: vehicle,
                                    onTap: () => context.push('/vehicles/${vehicle.id}'),
                                  ),
                                );
                              },
                            ),
                          ),
                          const SizedBox(height: 30),
                        ],
                      );
                    },
                  ),

                  // Why Choose Us Section
                  Container(
                    width: double.infinity,
                    color: Colors.grey[50],
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Pourquoi choisir ROADSTAR ?",
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 20),
                        _buildFeatureItem(Icons.verified_user, "Fiabilité", "Des véhicules inspectés et garantis."),
                        _buildFeatureItem(Icons.access_time, "Disponibilité", "Service client 24/7 pour vous assister."),
                        _buildFeatureItem(Icons.attach_money, "Meilleurs Prix", "Tarifs compétitifs pour un service premium."),
                      ],
                    ),
                  ),
                  
                  const SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFeatureItem(IconData icon, String title, String subtitle) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                ),
              ],
            ),
            child: Icon(icon, color: const Color(0xFFFF5722)),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
                Text(
                  subtitle,
                  style: const TextStyle(color: Colors.grey, fontSize: 12),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _HeaderDelegate extends SliverPersistentHeaderDelegate {
  final double minHeight;
  final double maxHeight;

  _HeaderDelegate({
    required this.minHeight,
    required this.maxHeight,
  });

  @override
  double get minExtent => minHeight;

  @override
  double get maxExtent => maxHeight;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final progress = shrinkOffset / maxExtent;
    final isCollapsed = progress > 0.7;
    
    return Stack(
      fit: StackFit.expand,
      children: [
        // Background Image
        Image.asset(
          'assets/images/bgm.png',
          fit: BoxFit.cover,
        ),
        
        // Gradient overlay
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.black.withValues(alpha: isCollapsed ? 0.5 : 0.2),
                Colors.black.withValues(alpha: 0.3),
              ],
            ),
          ),
        ),
        
        // Title positioned
        Positioned(
          left: 20,
          bottom: isCollapsed ? 20 : 40,
          child: Text(
            'ROADSTAR',
            style: GoogleFonts.outfit(
              fontSize: isCollapsed ? 20 : 28,
              fontWeight: FontWeight.bold,
              color: Colors.white,
              shadows: [
                const Shadow(
                  offset: Offset(0, 2),
                  blurRadius: 4.0,
                  color: Colors.black54,
                ),
              ],
            ),
          ),
        ),
        
        // Logo positioned discretely in top-right
        Positioned(
          right: 20,
          top: isCollapsed ? null : 40,
          bottom: isCollapsed ? 20 : null,
          child: Opacity(
            opacity: isCollapsed ? 0.3 : 0.4,
            child: Image.asset(
              'assets/icons/New_logo-RoadStar_blanc.png',
              height: isCollapsed ? 25 : 40,
              fit: BoxFit.contain,
            ),
          ),
        ),
        
        // Rounded white overlay at bottom (only when not collapsed)
        if (!isCollapsed)
          Positioned(
            left: 0,
            right: 0,
            bottom: -30,
            child: Container(
              height: 50,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
              ),
            ),
          ),
      ],
    );
  }

  @override
  bool shouldRebuild(covariant _HeaderDelegate oldDelegate) {
    return maxHeight != oldDelegate.maxHeight || minHeight != oldDelegate.minHeight;
  }
}
