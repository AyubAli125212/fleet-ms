const {mongoose , isValidObjectId } = require("mongoose");
const Vehicles = require("../models/Vehicles");

exports.managerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total number of vehicles
    const totalVehicles = await Vehicles.countDocuments({ userId });

    // Active and inactive vehicles count
    const activeVehicles = await Vehicles.countDocuments({
      userId,
      status: "active",
    });
    const inactiveVehicles = await Vehicles.countDocuments({
      userId,
      status: "inactive",
    });

    // Recently added vehicles (sorted by creation date)
    const recentlyAddedVehicles = await Vehicles.find({ userId })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("name licensePlate brand model year createdAt");

    if (!isValidObjectId(userId)) {
      throw new Error("Invalid user ID format");
    }

    // Vehicles grouped by brand for chart data
    const vehiclesByBrand = await Vehicles.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$brand",
          count: { $sum: 1 },
        },
      },
    ]);

    // Prepare chart data for vehicles by brand
    const chartData = vehiclesByBrand.map((brand) => ({
      brand: brand._id,
      count: brand.count,
    }));

    const dashboardData = {
      counts: {
        totalVehicles,
        activeVehicles,
        inactiveVehicles,
      },
      recentlyAddedVehicles,
      chart: {
        vehiclesByBrand: chartData,
      },
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching manager dashboard data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data.",
    });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const userId = req.user.id;
    const vehicles = await Vehicles.find({ userId }).select(
      "licensePlate name brand model year status createdAt updatedAt"
    );

    res.status(200).json({
      success: true,
      data: {
        vehicles,
      },
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles.",
    });
  }
};

exports.createVehicle = async (req, res) => {
  try {
    const { licensePlate, name, brand, model, year, status } = req.body;
    const userId = req.user.id;

    const existingVehicle = await Vehicles.findOne({ userId, licensePlate });
    if (existingVehicle) {
      return res.status(400).json({
        success: false,
        message: "License Plate already in use for this user.",
      });
    }

    // Create a new vehicle object
    const vehicle = new Vehicles({
      userId,
      licensePlate,
      name,
      brand,
      model,
      year,
      status,
    });

    await vehicle.save();

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully.",
      data: vehicle,
    });
  } catch (error) {
    console.error("Error creating vehicle:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to create vehicle.",
    });
  }
};

exports.toggleVehicleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const vehicle = await Vehicles.findOne({ _id: id, userId });
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found or does not belong to the user.",
      });
    }

    // Toggle the vehicle's status
    vehicle.status = vehicle.status === "active" ? "inactive" : "active";
    await vehicle.save();

    res.status(200).json({
      success: true,
      message: `Vehicle has been ${
        vehicle.status === "active" ? "activated" : "deactivated"
      }.`,
      data: vehicle,
    });
  } catch (error) {
    console.error("Error toggling vehicle status:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to toggle vehicle status.",
    });
  }
};
