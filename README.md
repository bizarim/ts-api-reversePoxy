# ts-api-reverseProxy
msa 설계시 api-gateway 목적으로 제작
하나의 container에서 사용가능 하고 여러 aws ec2에서도 사용가능

# config 설정
```json
[
    {
        "path": [
            "/test/**"
        ],
        "target": "http://localhost:10230"
    },
    {
        "path": [
            "/test/user/**"
        ],
        "target": "http://localhost:10231"
    },
    {
        "path": [
            "/test/wallet/**"
        ],
        "target": "http://localhost:10232"
    },
    {
        "path": [
            "/test/ledger/**"
        ],
        "target": "http://localhost:10233"
    }
]
```