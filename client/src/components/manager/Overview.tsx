import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Function to generate a dynamic color based on brand name
function generateColor(brand: string) {
  const hash = Array.from(brand).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

export default function Overview({ chart }: { chart: any }) {
  const { vehiclesByBrand: chartData } = chart;
  console.log("chartData : ", chartData);
  const chartConfig = React.useMemo(() => {
    const config: Record<string, { label: string; color: string }> = {};
    chartData?.forEach((item: any) => {
      if (!config[item.brand]) {
        config[item.brand] = {
          label: item.brand,
          color: generateColor(item.brand),
        };
      }
    });
    return config;
  }, [chartData]);

  const formattedData = chartData?.map((item: any) => ({
    name: chartConfig[item.brand]?.label || item.brand,
    count: item.count,
    fill: chartConfig[item.brand]?.color,
  }));

  const totalVehicles = React.useMemo(() => {
    return chartData?.reduce((acc: any, item: any) => acc + item.count, 0);
  }, [chartData]);

  const registrationIncrease = chartData?.length > 0 ? 20 : 0;

  return (
    <Card className="shadow-none border-none flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Vehicles By Brand</CardTitle>
        <CardDescription>
          January, 2024 - {moment(new Date()).format("MMMM, YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={formattedData}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVehicles.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Vehicles
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {`Increased up by ${registrationIncrease}% `}
          this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total number of vehicles you manage
        </div>
      </CardFooter>
    </Card>
  );
}
