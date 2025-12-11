
# CERT-IS
<p align="center">
  <img width="800" alt="CERT-IS 메인사진" src="https://github.com/user-attachments/assets/ee6faa36-aed8-4c42-a967-dab6e4530f51" />
</p>
<br/>

## 목차
- [📝 프로젝트 소개](#introduction)
- [🛠️ 기술 스택](#tech)
- [🚀 도메인](#domain)
- [🌟 주요 기능](#function)
- [🧑🏻‍💻 프로젝트 멤버](#member)
<br/>

## <span id="introduction">📝 프로젝트 소개</span>
- **프로젝트 기간** : 2025.07 ~ 2025.10
- **목적**
  - 부경대학교 정보 보안 동아리 CERT-IS의 공식 홈페이지로, 동아리 소개 및 활동 정보 제공, 회원 및 활동 관리 자동화를 통해 운영 효율성 향상과 대외 인지도 강화를 목적으로 개발하였습니다.

- **기대 효과**
  - CERT-IS 홈페이지를 통해 동아리 소개, 공지사항, 스케줄, 활동 기록 (스터디, 프로젝트 등), 가입 신청 등 대외 인지도를 증대할 수 있습니다.
  - **임원진**
    - 기존 Notion으로 관리하던 동아리 활동(스터디, 프로젝트)과 회원 정보를 홈페이지에서 통합 관리함으로써 운영 효율성을 높이고 더 체계적으로 관리할 수 있습니다.
    - 활동에 참여중인 회원 목록을 한 눈에 파악할 수 있어 활동 진행 상황 관리와 운영이 더욱 수월합니다.
  - **회원**
    - 현재 진행 중인 스터디와 프로젝트를 쉽게 확인할 수 있으며, '참가 신청' 기능을 통해 쉽게 활동에 참여할 수 있어 동아리 활동 참여율을 높일 수 있습니다.
<br/>  
  
## <span id="tech">🛠️ 기술 스택</span>
<table>
  <thead>
    <tr>
      <th>분류</th>
      <th>기술 스택</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>프론트엔드</td>
      <td>
        <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white"/>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>
        <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
        <img src="https://img.shields.io/badge/Zustand-443A3A?style=flat&logo=zustand&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>백엔드</td>
      <td>
        <img src="https://img.shields.io/badge/Java-007396?style=flat&logo=openjdk&logoColor=white"/>
        <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white"/>
        <img src="https://img.shields.io/badge/Gradle-02303A?style=flat&logo=gradle&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>데이터베이스</td>
      <td>
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white"/>
        <img src="https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white"/>
      </td>
    </tr>
    <tr>
      <td>인프라</td>
      <td>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"/>
        <img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&logo=amazonaws&logoColor=white"/>
        <img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&logo=amazonaws&logoColor=white"/>
        <img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white"/>
        <img src="https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=cloudflare&logoColor=white"/>
        <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white"/>
      </td>
    </tr>
  </tbody>
</table>
<br/>  

## <span id="domain">🚀 도메인</span>
| 구분 | 도메인 |
|------|--------|
| **전체 공개 도메인** | 동아리 소개(Home), 블로그(Blog, 외부 공개 선택 가능), 회원 정보(Members), 회원가입(Sign up), 로그인(Login) |
| **회원 전용 도메인** | 공지사항(Board), 스케줄(Schedule), 스터디(Study), 프로젝트(Project), 블로그(Blog, 내부 기본 접근), 프로필(Profile) |
| **관리자 전용 도메인** | 대시보드, 스케줄 관리, 스터디/프로젝트 관리, 블로그 관리, 회원 관리 |
<br/>  

## <span id="function">🌟 주요 기능</span>
### 유저 페이지
- **Auth 페이지**
  - **로그인 (Login)** : DB에 저장된 회원 정보를 기반으로 입력한 아이디와 비밀번호를 검증하여 로그인할 수 있습니다.
    ![로그인 크롭](https://github.com/user-attachments/assets/1b5e3ad0-0b3a-4e95-b249-b5d583aa1754)


  - **회원가입 (Sign Up)** : 회원 정보를 입력하여 회원가입을 할 수 있습니다.
    ![회원가입 크롭](https://github.com/user-attachments/assets/62a9a69a-d270-4222-bc5d-cded7d50a635)

 <br/>
    
- **메인 페이지**
  - **동아리 소개 (Home)**
    - CERT-IS 소개 및 미니 캘린더를 통해 이번 달 스케줄 정보를 확인할 수 있습니다.
      ![홈](https://github.com/user-attachments/assets/faf35f64-677c-45f5-8d72-f8463b780bac)


  - **공지사항 (Board)**
    - 임원진이 공지사항을 작성하거나 회원이 소개하고자 하는 정보가 있으면 작성하여 모든 회원이 볼 수 있습니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="2000" src="https://github.com/user-attachments/assets/b34eb06e-53ac-45f8-b740-4380d1849e03" /></td>
            <td><img width="2000" src="https://github.com/user-attachments/assets/4f72a2bc-b7f8-4130-b75a-c967c7e4d223" /></td>
          </tr>
          <tr>
            <td align="center">공지사항 목록</td>
            <td align="center">공지사항 상세 내용</td>
          </tr>
        </table>
      </div>



  
  - **스케줄 (Schedule)**
    - CERT-IS의 전체 일정을 확인할 수 있고, 동아리방 예약이 가능합니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="2000" alt="스케줄 신청" src="https://github.com/user-attachments/assets/77c180c2-ebbd-4426-ac6b-1a9bb848addb" /></td>
            <td><img width="2000" alt="스케줄 수락 완료시" src="https://github.com/user-attachments/assets/9ef4962b-4c03-42ff-a786-a624939003c5" /></td>
          </tr>
          <tr>
            <td align="center">스케줄 신청</td>
            <td align="center">스케줄</td>
          </tr>
        </table>
      </div>

  - **스터디 (Study)**
    - 스터디장이 스터디를 생성할 수 있고, 회원은 원하는 스터디에 참가 신청이 가능합니다. 이때 모든 스터디는 1주 ~ 2개월동안 수행 가능합니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="2000" alt="스터디" src="https://github.com/user-attachments/assets/f2a45316-92c5-4de0-8a25-7f1427b59947" /></td>
            <td><img width="2000" alt="스터디 세부" src="https://github.com/user-attachments/assets/e533765e-717e-4929-a92c-1f9099068f1e" /></td>
          </tr>
          <tr>
            <td align="center">스터디 목록</td>
            <td align="center">스터디 상세 내용</td>
          </tr>
        </table>
      </div>



  - **프로젝트 (Project)**
    - 프로젝트장이 프로젝트를 생성할 수 있고, 회원은 원하는 프로젝트에 참가 신청이 가능합니다. 이때 모든 프로젝트는 2주 ~ 6개월동안 수행 가능합니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="2000" alt="프로젝트" src="https://github.com/user-attachments/assets/6da5207d-5457-462b-8e29-86e011083e39" /></td>
            <td><img width="2000" alt="프로젝트 세부 크롭" src="https://github.com/user-attachments/assets/86aca4d6-2275-4655-b897-2b4f102d98cb" /></td>
          </tr>
          <tr>
            <td align="center">프로젝트 목록</td>
            <td align="center">프로젝트 상세 내용</td>
          </tr>
        </table>
      </div>

    
  - **블로그 (Blog)**
    - 모든 스터디 또는 프로젝트 종료 시 스터디장은 활동의 결과물을 작성하여 모든 회원이 해당 스터디(프로젝트)의 결과물을 볼 수 있습니다.
    - 모든 블로그는 외부 공개 및 비공개 선택이 가능합니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="2000" alt="블로그 크롭" src="https://github.com/user-attachments/assets/c9101cce-b9a7-45ab-bb2b-75a4c67982ef" /></td>
            <td><img width="2000" alt="블로그 세부 크롭" src="https://github.com/user-attachments/assets/c8e28b95-9901-413a-9c17-85b09cfd5722" /></td>
          </tr>
          <tr>
            <td align="center">블로그 목록</td>
            <td align="center">블로그 상세 내용</td>
          </tr>
        </table>
      </div>
      
  - **회원 정보 (Members)**
    - 회원들의 이메일, Github, LinkedIn을 볼 수 있습니다.
    - 검색 기능을 통해 회원을 검색할 수 있습니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="5764" height="3772" alt="멤버 목록" src="https://github.com/user-attachments/assets/56db395c-21ef-4450-a344-9345d1c5d015" /></td>
          </tr>
          <tr>
            <td align="center">멤버 목록</td>
          </tr>
        </table>
      </div>


  - **프로필 (Profile)**
    - 본인의 스터디 및 프로젝트 기록, 블로그 작성 내역을 확인할 수 있으며, 프로필 수정이 가능합니다.
    - 본인의 벌점 점수와 벌점 유예 기간을 확인할 수 있습니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="1605" height="933" alt="프로필2" src="https://github.com/user-attachments/assets/9399d150-7331-4d39-bc7b-0c59ade64d0d" /></td>
            <td><img width="1607" height="933" alt="프로필1" src="https://github.com/user-attachments/assets/b249dc48-bade-4a7d-8e54-19cc9e688679" /></td>
          </tr>
          <tr>
            <td align="center">프로필 (내 스터디/프로젝트)</td>
            <td align="center">프로필 (내 블로그)</td>
          </tr>
        </table>
      </div>



### 관리자 페이지
- **대시보드 (통계, 회원가입 관리, 탈퇴 위험 회원 정보)**
  - **통계**
    - 스터디 및 프로젝트 개설 통계를 확인할 수 있습니다.

  - **탈퇴 위험 회원 정보**
    - 벌점 3점 이상의 회원이 표시되어 집중 관리할 수 있습니다.
  <img width="4000" alt="대시보드 크롭" src="https://github.com/user-attachments/assets/340737f9-d7cd-4619-ac5b-a57c14439c36" />


  - **회원가입 관리**
    - 관리자가 실제 동아리 회원인지 여부를 판별해 승인/거절합니다.
      ![관리자_회원가입 수락 크롭](https://github.com/user-attachments/assets/562b849a-d567-42a8-9422-df1bb30ac2f0)


- **스케줄 관리**
  - 회원이 신청한 동아리방 예약을 관리하고, 공식 일정을 등록할 수 있습니다.
    ![관리자_스케줄 등록](https://github.com/user-attachments/assets/afa238d2-5b18-4678-a389-9216dbb43ddf)


    
- **스터디 및 프로젝트 관리**
  - 모든 스터디 내역과 개설 신청한 스터디, 종료 요청한 스터디를 확인하여 승인/거절할 수 있습니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="1688" height="946" alt="스터디 목록" src="https://github.com/user-attachments/assets/b9c778e0-22f1-4829-b264-077a5dbce5c6" /></td>
            <td><img width="1687" height="938" alt="스터디 개설 승인" src="https://github.com/user-attachments/assets/82bc73ac-dd13-4bf4-bf73-8f984f67099a" /></td>
            <td><img width="1667" height="938" alt="스터디 종료 승인" src="https://github.com/user-attachments/assets/044bbc6a-f5cc-477e-9fea-b4425e7f7202" /></td>
          </tr>
          <tr>
            <td align="center">스터디 (프로젝트) 목록</td>
            <td align="center">스터디 (프로젝트) 개설 승인 목록</td>
            <td align="center">스터디 (프로젝트) 종료 승인 목록</td>
          </tr>
        </table>
      </div>

    
- **블로그 관리**
  - 회원이 작성한 블로그 내역을 관리하고, 외부 공개 및 비공개 여부를 설정할 수 있습니다.
      <div align="center">
        <table>
          <tr>
          <td><img width="1675" height="942" alt="공개 블로그" src="https://github.com/user-attachments/assets/07bfff14-0abc-49b4-adb0-6de3147f01a2" /></td>
          <td><img width="1671" height="944" alt="비공개 블로그" src="https://github.com/user-attachments/assets/a883e904-df36-4fbc-883b-cae1d287673c" /></td>
          </tr>
          <tr>
            <td align="center">블로그 외부 공개 목록</td>
            <td align="center">블로그 외부 비공개 목록</td>
          </tr>
        </table>
      </div>
    
- **회원 관리**
  - 모든 회원의 기본 정보와 벌점, 벌점 유예 기간을 관리할 수 있습니다.
  - 모든 회원의 기본 정보를 CSV, EXCEL로 추출이 가능하여 회원 정보를 수월하게 확인할 수 있습니다.
      <div align="center">
        <table>
          <tr>
            <td><img width="1678" height="942" alt="멤버 목록" src="https://github.com/user-attachments/assets/4d875e3f-ff8a-489b-8cc6-64712c1c4fbe" /></td>
            <td><img width="1683" height="938" alt="멤버 상세" src="https://github.com/user-attachments/assets/c5271356-8b17-41ca-83c5-8c6399e66e43" /></td>
          </tr>
          <tr>
            <td align="center">멤버 목록</td>
            <td align="center">멤버 상세 정보</td>
          </tr>
        </table>
      </div>
<br/>  

### 에러 페이지
- **403, 404 에러**
        <div align="center">
        <table>
          <tr>
            <td><img width="1707" height="937" alt="403" src="https://github.com/user-attachments/assets/851d4452-ef09-467e-91ac-97ee89bc9fbc" /></td>
            <td><img width="1692" height="942" alt="404" src="https://github.com/user-attachments/assets/3825a4fe-ba2a-41d4-be9e-7b62529c011a" /></td>
          </tr>
          <tr>
            <td align="center">403 에러</td>
            <td align="center">404 에러</td>
          </tr>
        </table>
      </div>
    

## <span id="member">🧑🏻‍💻 프로젝트 멤버</span>

| 이름 | 역할 |
| :---------: | :------------------- |
| [민영재](https://github.com/yeomin4242) | PM, FE, BE |
| [민웅기](https://github.com/minwoonggi) | FE, BE |
| [김주희](https://github.com/joooii) | FE, Design |
