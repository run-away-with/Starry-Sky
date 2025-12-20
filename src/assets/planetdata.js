const planetList = [
  {
    name: '太阳',
    img: 'src/assets/planets/Sun.jpg',
    type: '恒星',
    desc: '太阳是太阳系的中心恒星,占太阳系总质量的99.86%，通过核聚变持续释放光和热，是地球生命赖以生存的能量来源。',
    habitat: '太阳系中心',
    // 补充核心数据
    diameter: '1392000 千米(地球的109倍)',
    mass: '1.989x10³⁰ 千克(地球的333000倍)',
    surfaceTemperature: '约5500℃(光球层)',
    coreTemperature: '约1500万℃',
    orbitalPeriod: '无（太阳系中心天体）',
    rotationPeriod: '约25.4天（赤道）/ 35天(两极)',
    composition: '氢(约73%)、氦(约25%)、其他元素(约2%)',
    feature: '拥有太阳黑子、耀斑、日珥等活动现象，磁场强度约为地球的两倍'
  },
  {
    name: '水星',
    img: 'src/assets/planets/Mercury.jpg',
    type: '类地行星',
    desc: '水星是太阳系中最靠近太阳的行星,也是八大行星中最小的一颗,几乎无大气层,导致表面昼夜温差超过600℃。',
    habitat: '太阳系内侧(第1颗行星)',
    diameter: '4880 千米(地球的38%)',
    mass: '3.3011x10²³ 千克(地球的5.5%)',
    surfaceTemperature: '-173℃(夜)~ 427℃(昼)',
    orbitalPeriod: '87.97 地球日',
    rotationPeriod: '58.65 地球日',
    composition: '金属核(约占体积70%)、硅酸盐外壳(约占30%)',
    feature: '无卫星，无大气层，表面遍布撞击坑，轨道偏心率最大'
  },
  {
    name: '金星',
    img: 'src/assets/planets/Venus.jpg',
    type: '类地行星',
    desc: '金星是太阳系中第二颗行星，也被称为“启明星/长庚星”，拥有浓厚的二氧化碳大气层，产生极强的温室效应，是太阳系中最热的行星。',
    habitat: '太阳系内侧(第2颗行星)',
    diameter: '12104 千米(地球的95%)',
    mass: '4.8675x10²⁴ 千克(地球的81.5%)',
    surfaceTemperature: '约464℃(全星均温，无昼夜差异)',
    orbitalPeriod: '224.7 地球日',
    rotationPeriod: '243 地球日（逆向自转，太阳系唯一）',
    composition: '硅酸盐外壳、金属核,大气层96.5%为二氧化碳',
    feature: '无卫星,有硫酸云,大气压是地球的92倍,自转方向与其他行星相反'
  },
  {
    name: '地球',
    img: 'src/assets/planets/Earth.jpg',
    type: '类地行星',
    desc: '地球是太阳系中第三颗行星,是唯一已知存在液态水和生命的天体,拥有保护生命的磁场和大气层,表面71%被海洋覆盖。',
    habitat: '太阳系宜居带(第3颗行星)',
    diameter: '12742 千米',
    mass: '5.97237x10²⁴ 千克',
    surfaceTemperature: '-88℃ ~ 58℃(平均15℃)',
    orbitalPeriod: '365.24 地球日',
    rotationPeriod: '23小时56分4秒',
    composition: '铁镍核、硅酸盐地幔、地壳,大气层78%氮气、21%氧气',
    feature: '1颗天然卫星(月球),有板块构造运动,磁场能抵御太阳风'
  },
  {
    name: '火星',
    img: 'src/assets/planets/Mars.jpg',
    type: '类地行星',
    desc: '火星被称为“红色星球”，因其表面富含氧化铁（铁锈）而呈现橘红色，拥有稀薄的二氧化碳大气层，两极有干冰/水冰组成的极冠。',
    habitat: '太阳系外侧(第4颗行星)',
    diameter: '6779 千米(地球的53%)',
    mass: '6.4171x10²³ 千克(地球的10.7%)',
    surfaceTemperature: '-153℃ ~ 20℃(平均-63℃)',
    orbitalPeriod: '687 地球日',
    rotationPeriod: '24小时37分23秒',
    composition: '硅酸盐外壳、金属核,大气层95%二氧化碳',
    feature:
      '2颗小型卫星(火卫一/火卫二)，有太阳系最高山（奥林匹斯山）和最大峡谷（水手谷）'
  },
  {
    name: '木星',
    img: 'src/assets/planets/Jupiter.jpg',
    type: '气态巨行星',
    desc: '木星是太阳系中体积和质量最大的行星,质量是其他七大行星总和的2.5倍，主要由氢和氦组成，拥有著名的“大红斑”风暴系统。',
    habitat: '太阳系外侧(第5颗行星)',
    diameter: '139820 千米(地球的11倍)',
    mass: '1.8982x10²⁷ 千克(地球的318倍)',
    surfaceTemperature: '-145℃(大气层顶部)',
    orbitalPeriod: '11.86 地球年',
    rotationPeriod: '9小时55分30秒(太阳系自转最快)',
    composition: '氢(约75%)、氦(约24%)、其他元素(约1%)，无固态表面',
    feature:
      '至少95颗卫星(最大的4颗为伽利略卫星),有微弱的行星环,磁场强度是地球的20倍'
  },
  {
    name: '土星',
    img: 'src/assets/planets/Saturn.jpg',
    desc: '土星是太阳系第六颗行星，以其壮观的冰质环系统闻名，是密度最小的行星（密度比水小），同样以氢和氦为主要成分。',
    type: '气态巨行星',
    habitat: '太阳系外侧(第6颗行星)',
    diameter: '116460 千米(地球的9.4倍)',
    mass: '5.6834x10²⁶ 千克(地球的95倍)',
    surfaceTemperature: '-178℃(大气层顶部)',
    orbitalPeriod: '29.46 地球年',
    rotationPeriod: '10小时33分(赤道)/ 10小时40分(两极)',
    composition: '氢(约96%)、氦(约3%)、其他元素(约1%)，无固态表面',
    feature:
      '至少146颗卫星(土卫六是太阳系唯一有浓厚大气层的卫星)，环系统由冰粒和岩石碎片组成，厚度仅数千米'
  },
  {
    name: '天王星',
    img: 'src/assets/planets/Uranus.jpg',
    type: '冰巨行星',
    desc: '天王星是太阳系第七颗行星,是唯一“躺着”自转的行星(自转轴倾角98°),主要由冰质(水、氨、甲烷)和气体组成，呈现独特的蓝绿色。',
    habitat: '太阳系外侧(第7颗行星)',
    diameter: '50724 千米(地球的4倍)',
    mass: '8.6810x10²⁵ 千克(地球的14.5倍)',
    surfaceTemperature: '-224℃(太阳系最冷行星)',
    orbitalPeriod: '84.01 地球年',
    rotationPeriod: '17小时14分',
    composition: '冰质幔（水、氨、甲烷）、氢氦大气层，甲烷是呈现蓝绿色的原因',
    feature: '27颗已知卫星,有微弱的行星环,自转方向接近垂直于公转轨道'
  },
  {
    name: '海王星',
    img: 'src/assets/planets/Neptune.jpg',
    type: '冰巨行星',
    desc: '海王星是太阳系第八颗行星,也是最远的行星,拥有太阳系最强的风暴(风速达2100千米/小时)，甲烷大气层使其呈现深蓝色。',
    habitat: '太阳系外侧(第8颗行星)',
    diameter: '49244 千米(地球的3.88倍)',
    mass: '1.0241x10²⁶ 千克(地球的17倍)',
    surfaceTemperature: '-218℃',
    orbitalPeriod: '164.79 地球年',
    rotationPeriod: '16小时6分',
    composition: '冰质幔（水、氨、甲烷）、氢氦大气层，核心为岩石和冰',
    feature:
      '14颗已知卫星(海卫一是唯一逆行的大型卫星),有行星环,磁场偏离核心且倾斜'
  }
];
export { planetList };
