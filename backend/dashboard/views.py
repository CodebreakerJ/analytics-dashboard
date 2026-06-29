from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import random
from datetime import date

categories = ["SEO", "Ads", "Social", "Email"]
statuses = ["Active", "Paused", "Completed"]
devices = ["Desktop", "Mobile", "Tablet"]
sources = ["Google", "Bing", "Facebook", "Direct"]

records = []

for index in range(80000):
    clicks = random.randint(0, 1000)
    impressions = clicks + random.randint(0, 5000)
    ctr = round((clicks / impressions) * 100, 2) if impressions else 0

    records.append({
        "id": index + 1,
        "keyword": f"Keyword {index + 1}",
        "category": categories[index % len(categories)],
        "status": statuses[index % len(statuses)],
        "device": devices[index % len(devices)],
        "source": sources[index % len(sources)],
        "clicks": clicks,
        "impressions": impressions,
        "ctr": ctr,
        "rank": random.randint(1, 100),
        "date": f"2026-06-{str((index % 20) + 1).zfill(2)}",
    })

annotations = [
    {
        "id": 1,
        "date": "2026-06-05",
        "title": "SEO Campaign Launch",
        "description": "New SEO campaign started."
    },
    {
        "id": 2,
        "date": "2026-06-12",
        "title": "Google Algorithm Update",
        "description": "Ranking changes observed."
    }
]


class DashboardAPIView(APIView):
    def get(self, request):
        page = int(request.GET.get("page", 1))
        limit = int(request.GET.get("limit", 50))
        search = request.GET.get("search", "")
        category = request.GET.get("category", "")
        status_filter = request.GET.get("status", "")
        device = request.GET.get("device", "")
        rank_range = request.GET.get("rankRange", "")

        sort_key = request.GET.get("sortKey", "id")
        sort_order = request.GET.get("sortOrder", "asc")

        data = records

        if search:
            data = [
                item for item in data
                if search.lower() in item["keyword"].lower()
            ]

        if category:
            data = [item for item in data if item["category"] == category]

        if status_filter:
            data = [item for item in data if item["status"] == status_filter]

        if device:
            data = [item for item in data if item["device"] == device]

        if rank_range:
            min_rank, max_rank = map(int, rank_range.split("-"))
            data = [
                item for item in data
                if min_rank <= item["rank"] <= max_rank
            ]

        if sort_key:
            data = sorted(
                data,
                key=lambda item: item.get(sort_key),
                reverse=sort_order == "desc"
            )

        total = len(data)

        start = (page - 1) * limit
        end = start + limit
        paginated_data = data[start:end]

        return Response({
            "records": paginated_data,
            "total": total,
        })

class AnnotationAPIView(APIView):
    def get(self, request):
        return Response(annotations)

    def post(self, request):
        new_annotation = {
            "id": int(date.today().strftime("%Y%m%d")) + len(annotations),
            "date": request.data.get("date"),
            "title": request.data.get("title"),
            "description": request.data.get("description", ""),
        }

        annotations.append(new_annotation)

        return Response(new_annotation, status=status.HTTP_201_CREATED)


class AnnotationDetailAPIView(APIView):
    def put(self, request, annotation_id):
        for item in annotations:
            if item["id"] == annotation_id:
                item["date"] = request.data.get("date", item["date"])
                item["title"] = request.data.get("title", item["title"])
                item["description"] = request.data.get(
                    "description",
                    item["description"]
                )

                return Response(item)

        return Response(
            {"message": "Annotation not found"},
            status=status.HTTP_404_NOT_FOUND
        )