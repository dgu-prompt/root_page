// 리전 매핑 데이터
const awsRegions = {
  "af-south-1": "아프리카(케이프타운)",
  "ap-east-1": "아시아 태평양(홍콩)",
  "ap-northeast-1": "아시아 태평양(도쿄)",
  "ap-northeast-2": "아시아 태평양(서울)",
  "ap-northeast-3": "아시아 태평양(오사카)",
  "ap-south-1": "아시아 태평양(뭄바이)",
  "ap-south-2": "아시아 태평양(하이데라바드)",
  "ap-southeast-1": "아시아 태평양(싱가포르)",
  "ap-southeast-2": "아시아 태평양(시드니)",
  "ap-southeast-3": "아시아 태평양(자카르타)",
  "ap-southeast-4": "아시아 태평양(멜버른)",
  "ap-southeast-5": "아시아 태평양(말레이시아)",
  "ca-central-1": "캐나다(중부)",
  "ca-west-1": "캐나다 서부(캘거리)",
  "cn-north-1": "중국(베이징)",
  "cn-northwest-1": "중국(닝샤)",
  "eu-central-1": "유럽(프랑크푸르트)",
  "eu-central-2": "유럽(취리히)",
  "eu-north-1": "유럽(스톡홀름)",
  "eu-south-1": "유럽(밀라노)",
  "eu-south-2": "유럽(스페인)",
  "eu-west-1": "유럽(아일랜드)",
  "eu-west-2": "유럽(런던)",
  "eu-west-3": "유럽(파리)",
  "il-central-1": "이스라엘(텔아비브)",
  "me-central-1": "중동(UAE)",
  "me-south-1": "중동(바레인)",
  "sa-east-1": "남아메리카(상파울루)",
  "us-east-1": "미국 동부(버지니아 북부)",
  "us-east-2": "미국 동부(오하이오)",
  "us-west-1": "미국 서부(캘리포니아 북부)",
  "us-west-2": "미국 서부(오레곤)",
};

// 매핑 함수
export function getRegionName(region: string) {
  return awsRegions[region] || "N/A";
}