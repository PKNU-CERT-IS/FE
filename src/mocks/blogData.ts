import { BlogPost } from "@/types/blog";

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "React 18의 새로운 기능들과 성능 최적화",
    excerpt:
      "React 18에서 도입된 Concurrent Features와 Automatic Batching을 활용한 성능 최적화 방법을 알아봅니다.",
    content: `
      <h2>React 18의 주요 변화점</h2>
      <p>React 18은 새로운 동시성 기능들을 통해 사용자 경험을 크게 개선했습니다.</p>
      
      <h3>Concurrent Features</h3>
      <p>React 18의 가장 큰 변화는 동시성 기능의 도입입니다. 이를 통해:</p>
      <ul>
        <li>렌더링 과정을 중단하고 재개할 수 있습니다</li>
        <li>우선순위에 따라 업데이트를 처리할 수 있습니다</li>
        <li>더 나은 사용자 경험을 제공할 수 있습니다</li>
      </ul>

      <h3>Automatic Batching</h3>
      <p>이전 버전에서는 React 이벤트 핸들러 내에서만 배칭이 동작했지만, React 18에서는 Promise, setTimeout 등에서도 자동으로 배칭됩니다.</p>
      
      <pre><code>
// React 18에서 자동으로 배칭됨
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React는 이 두 업데이트를 하나로 배칭합니다
}, 1000);
      </code></pre>
    `,
    author: "김개발",
    category: "개발",
    tags: ["React", "JavaScript", "성능최적화", "프론트엔드"],
    createdAt: "2024-01-15",
    views: 1250,
    likes: 45,
    featured: true,
    published: true,
  },
  {
    id: 2,
    title: "웹 보안의 기초: XSS와 CSRF 공격 방어하기",
    excerpt:
      "웹 애플리케이션에서 가장 흔히 발생하는 XSS와 CSRF 공격의 원리와 방어 방법을 상세히 설명합니다.",
    content: `
      <h2>웹 보안의 중요성</h2>
      <p>현대 웹 애플리케이션에서 보안은 선택이 아닌 필수입니다.</p>
      
      <h3>XSS (Cross-Site Scripting) 공격</h3>
      <p>XSS 공격은 악성 스크립트를 웹 페이지에 삽입하여 사용자의 정보를 탈취하는 공격입니다.</p>
      
      <h4>방어 방법:</h4>
      <ul>
        <li>입력값 검증 및 이스케이프 처리</li>
        <li>Content Security Policy (CSP) 설정</li>
        <li>HttpOnly 쿠키 사용</li>
      </ul>

      <h3>CSRF (Cross-Site Request Forgery) 공격</h3>
      <p>사용자가 의도하지 않은 요청을 강제로 전송하게 만드는 공격입니다.</p>
      
      <h4>방어 방법:</h4>
      <ul>
        <li>CSRF 토큰 사용</li>
        <li>SameSite 쿠키 속성 설정</li>
        <li>Referer 헤더 검증</li>
      </ul>
    `,
    author: "박보안",
    category: "학습",
    tags: ["보안", "XSS", "CSRF", "웹개발"],
    createdAt: "2024-01-12",
    views: 890,
    likes: 32,
    published: true,
  },
  {
    id: 3,
    title: "타입스크립트 고급 패턴과 유틸리티 타입",
    excerpt:
      "TypeScript의 고급 타입 시스템을 활용한 패턴들과 내장 유틸리티 타입들의 실제 활용 방법을 알아봅니다.",
    content: `
      <h2>TypeScript 고급 타입 패턴</h2>
      <p>TypeScript의 강력한 타입 시스템을 활용하면 더 안전하고 유지보수하기 쉬운 코드를 작성할 수 있습니다.</p>
      
      <h3>유틸리티 타입 활용</h3>
      <p>TypeScript는 다양한 유틸리티 타입을 제공합니다:</p>
      
      <h4>Partial과 Required</h4>
      <pre><code>
interface User {
  id: number;
  name: string;
  email: string;
}

// 모든 속성을 선택적으로 만듦
type PartialUser = Partial<User>;

// 모든 속성을 필수로 만듦
type RequiredUser = Required<User>;
      </code></pre>

      <h4>Pick과 Omit</h4>
      <pre><code>
// 특정 속성만 선택
type UserSummary = Pick<User, 'id' | 'name'>;

// 특정 속성 제외
type UserWithoutId = Omit<User, 'id'>;
      </code></pre>
    `,
    author: "이타입",
    category: "개발",
    tags: ["TypeScript", "고급패턴", "유틸리티타입"],
    createdAt: "2024-01-10",
    views: 2100,
    likes: 78,
    published: true,
  },
  {
    id: 4,
    title: "알고리즘 문제 해결 전략: 동적 계획법",
    excerpt:
      "동적 계획법의 핵심 개념부터 실제 코딩 테스트에서 자주 출제되는 문제 유형과 해결 전략을 정리했습니다.",
    content: `
      <h2>동적 계획법 (Dynamic Programming)</h2>
      <p>동적 계획법은 복잡한 문제를 간단한 하위 문제로 나누어 해결하는 알고리즘 기법입니다.</p>
      
      <h3>기본 원리</h3>
      <ul>
        <li>최적 부분 구조 (Optimal Substructure)</li>
        <li>중복되는 하위 문제들 (Overlapping Subproblems)</li>
      </ul>

      <h3>구현 방법</h3>
      <h4>1. Top-down (메모이제이션)</h4>
      <pre><code>
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return 1
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]
      </code></pre>

      <h4>2. Bottom-up (타뷸레이션)</h4>
      <pre><code>
def fibonacci(n):
    if n <= 2:
        return 1
    dp = [0] * (n + 1)
    dp[1] = dp[2] = 1
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
      </code></pre>
    `,
    author: "최알고",
    category: "학습",
    tags: ["알고리즘", "동적계획법", "문제해결", "코딩테스트"],
    createdAt: "2024-01-08",
    views: 1680,
    likes: 56,
    published: true,
  },
  {
    id: 5,
    title: "Docker와 Kubernetes를 활용한 마이크로서비스 배포",
    excerpt:
      "컨테이너 기술을 활용하여 마이크로서비스 아키텍처를 구성하고 배포하는 과정을 단계별로 설명합니다.",
    content: `
      <h2>마이크로서비스와 컨테이너</h2>
      <p>마이크로서비스 아키텍처는 애플리케이션을 작은 서비스들로 분할하여 개발하고 배포하는 방법론입니다.</p>
      
      <h3>Docker 기본</h3>
      <h4>Dockerfile 작성</h4>
      <pre><code>
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
      </code></pre>

      <h3>Kubernetes 배포</h3>
      <h4>Deployment 매니페스트</h4>
      <pre><code>
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: my-app:latest
        ports:
        - containerPort: 3000
      </code></pre>
    `,
    author: "정데브옵스",
    category: "개발",
    tags: ["Docker", "Kubernetes", "마이크로서비스", "DevOps"],
    createdAt: "2024-01-05",
    views: 1420,
    likes: 67,
    published: true,
  },
  {
    id: 6,
    title: "개발자 컨퍼런스 참석 후기: NHN FORWARD 2024",
    excerpt:
      "NHN FORWARD 2024 컨퍼런스에서 인상 깊었던 세션들과 업무 인사이트를 공유합니다.",
    content: `
      <h2>NHN FORWARD 2024 후기</h2>
      <p>올해 NHN FORWARD에서는 AI, 클라우드, 그리고 개발자 경험에 대한 다양한 세션들이 있었습니다.</p>
      
      <h3>인상 깊었던 세션들</h3>
      <h4>1. "대규모 서비스의 성능 최적화"</h4>
      <p>수백만 사용자를 서비스하는 시스템의 성능 최적화 사례를 들을 수 있었습니다.</p>
      
      <h4>2. "AI 시대의 개발자 역할"</h4>
      <p>AI 도구들이 개발 프로세스에 미치는 영향과 개발자가 준비해야 할 것들에 대한 통찰을 얻었습니다.</p>

      <h3>주요 인사이트</h3>
      <ul>
        <li>기술 트렌드 파악의 중요성</li>
        <li>지속적인 학습과 적응</li>
        <li>협업과 커뮤니케이션 스킬</li>
        <li>문제 해결 능력의 가치</li>
      </ul>

      <h3>개인적 소감</h3>
      <p>이번 컨퍼런스를 통해 현재 개발 트렌드를 파악하고, 앞으로의 학습 방향을 설정할 수 있었습니다.</p>
    `,
    author: "김후기",
    category: "활동",
    tags: ["컨퍼런스", "NHN", "개발", "네트워킹"],
    createdAt: "2024-01-03",
    views: 980,
    likes: 42,
    published: true,
  },
  {
    id: 7,
    title: "개발자 컨퍼런스 참석 후기: NHN FORWARD 2024",
    excerpt:
      "NHN FORWARD 2024 컨퍼런스에서 인상 깊었던 세션들과 업무 인사이트를 공유합니다.",
    content: `
      <h2>NHN FORWARD 2024 후기</h2>
      <p>올해 NHN FORWARD에서는 AI, 클라우드, 그리고 개발자 경험에 대한 다양한 세션들이 있었습니다.</p>
      
      <h3>인상 깊었던 세션들</h3>
      <h4>1. "대규모 서비스의 성능 최적화"</h4>
      <p>수백만 사용자를 서비스하는 시스템의 성능 최적화 사례를 들을 수 있었습니다.</p>
      
      <h4>2. "AI 시대의 개발자 역할"</h4>
      <p>AI 도구들이 개발 프로세스에 미치는 영향과 개발자가 준비해야 할 것들에 대한 통찰을 얻었습니다.</p>

      <h3>주요 인사이트</h3>
      <ul>
        <li>기술 트렌드 파악의 중요성</li>
        <li>지속적인 학습과 적응</li>
        <li>협업과 커뮤니케이션 스킬</li>
        <li>문제 해결 능력의 가치</li>
      </ul>

      <h3>개인적 소감</h3>
      <p>이번 컨퍼런스를 통해 현재 개발 트렌드를 파악하고, 앞으로의 학습 방향을 설정할 수 있었습니다.</p>
    `,
    author: "김후기",
    category: "활동",
    tags: ["컨퍼런스", "NHN", "개발", "네트워킹"],
    createdAt: "2024-01-03",
    views: 980,
    likes: 42,
    published: true,
  },
];

// 블로그 데이터 유틸리티 함수들
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return mockBlogPosts.find((post) => post.id === id);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === "전체") {
    return mockBlogPosts;
  }
  return mockBlogPosts.filter((post) => post.category === category);
};

export const searchBlogPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.author.toLowerCase().includes(lowercaseQuery) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
};
