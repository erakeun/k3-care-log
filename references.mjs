export const aveoReferences=[];
const base='https://ownersmanual.kia.com/full_webhelp/';
const row=(name,kind,km,months,first=null,detail='')=>({name,kind,intervalKm:km,intervalMonths:months,first,detail});
const shared=()=>[row('브레이크액','교체',50000,null,null,'액량 부족은 무조건 보충하지 말고 누유·패드 마모 원인을 점검하세요.'),row('냉각수','교체',40000,24,[200000,120],'최초 200,000 km / 120개월, 이후 40,000 km / 24개월. 부족은 원인 점검, EV 보충·교체는 기아 서비스센터.'),row('실내 에어컨필터','교체',15000,null),row('구동벨트','점검',30000,24,[90000,72],'최초 90,000 km / 72개월, 이후 30,000 km / 24개월. 점검이며 교체를 뜻하지 않아요.')];
export const profiles=[
 {id:'k3-2024-normal',label:'K3 2024 · Smartstream G1.6 · IVT · 통상',year:'2024',engine:/^(Smartstream G1\.6|스마트스트림 G1\.6)$/i,fuel:/^(휘발유|가솔린)$/,transmission:'CVT',usage:'일반',url:base+'BD/2024/ko_KR/topics/chapter8_4_1.html',rows:[row('엔진오일 · 오일필터','교체',15000,12),...shared()]},
 {id:'k3-2024-severe',label:'K3 2024 · Smartstream G1.6 · IVT · 가혹',year:'2024',engine:/^(Smartstream G1\.6|스마트스트림 G1\.6)$/i,fuel:/^(휘발유|가솔린)$/,transmission:'CVT',usage:'가혹조건 가능',url:base+'BD/2024/ko_KR/topics/chapter8_4_2.html',rows:[row('엔진오일 · 오일필터','교체',7500,6),row('변속기 오일','교체',100000,null,null,'IVT 가혹조건 1·4·5·6·7·8·9·11에 해당할 때만 적용.'),row('브레이크 패드 · 디스크','점검',null,null,null,'상태에 따라 수시 점검; 고정 교체 주기 아님.')]}];
export function matches(v,p){return v.year===p.year&&p.engine.test(v.engine)&&p.fuel.test(v.fuel)&&v.transmission===p.transmission&&v.usage===p.usage;}
export function ruleFor(i){const m=i.note.match(/^기아 공식 \[([^:]+):(\d+)\]/);if(!m)return null;const p=profiles.find(x=>x.id===m[1]),r=p?.rows[+m[2]];return r?{p,r}:null;}
export function presetNote(p,r,n){return `기아 공식 [${p.id}:${n}] ${p.label}. ${r.detail} ${r.first?'최초 계산은 확인한 출고일·초기 거리 기준을 기록하세요. 실제 첫 작업 기록 후 반복 주기로 전환합니다.':''} 근거: ${p.url}`;}
