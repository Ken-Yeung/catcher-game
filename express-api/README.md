# API Document

## Get Record
GET: `http://127.0.0.1:8000/api/v1/records`

Query:

    Key: string
    value: number

Response:
```
{
    id: number;
    name: string;
    score: number;
    rank: number
}[]
```

---

## Post Record
POST: `http://127.0.0.1:8000/api/v1/records`

Body:

    name: string
    score: number
    id?: number

Response:
```
{
    id: number;
    name: string;
    score: number;
}
```