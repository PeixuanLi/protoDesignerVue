export interface MenuItem {
  id: string
  label: string
  icon: string
  badge?: string
  badgeType?: 'hot' | 'new'
  active?: boolean
  children?: MenuItem[]
}

export interface SidebarCategory {
  id: string
  label: string
  icon: string
  items: MenuItem[]
}

export const sidebarCategories: SidebarCategory[] = [
  {
    id: 'overview',
    label: '总览',
    icon: 'Dashboard',
    items: [
      { id: 'dashboard', label: '总览', icon: 'Odometer', active: true },
    ],
  },
  {
    id: 'compute',
    label: '计算',
    icon: 'Monitor',
    items: [
      { id: 'ecs', label: '弹性云服务器 ECS', icon: 'Monitor' },
      { id: 'bms', label: '裸金属服务器 BMS', icon: 'Cpu' },
      { id: 'as', label: '弹性伸缩 AS', icon: 'ScaleToOriginal', badge: 'HOT', badgeType: 'hot' },
      { id: 'ims', label: '镜像服务 IMS', icon: 'Picture' },
      { id: 'functiongraph', label: '函数工作流 FunctionGraph', icon: 'Connection', badge: '新', badgeType: 'new' },
    ],
  },
  {
    id: 'network',
    label: '网络',
    icon: 'Connection',
    items: [
      { id: 'vpc', label: '虚拟私有云 VPC', icon: 'Share' },
      { id: 'eip', label: '弹性公网IP EIP', icon: 'Position' },
      { id: 'elb', label: '弹性负载均衡 ELB', icon: 'Grid' },
      { id: 'nat', label: 'NAT网关', icon: 'Switch' },
      { id: 'vpn', label: '虚拟专用网络 VPN', icon: 'Lock' },
    ],
  },
  {
    id: 'storage',
    label: '存储',
    icon: 'Coin',
    items: [
      { id: 'evs', label: '云硬盘 EVS', icon: 'Coin' },
      { id: 'sfs', label: '弹性文件服务 SFS', icon: 'FolderOpened' },
      { id: 'obs', label: '对象存储服务 OBS', icon: 'Box', badge: 'HOT', badgeType: 'hot' },
      { id: 'csbs', label: '云服务器备份 CSBS', icon: 'Files' },
    ],
  },
  {
    id: 'database',
    label: '数据库',
    icon: 'Coin',
    items: [
      { id: 'rds', label: '关系型数据库 RDS', icon: 'Coin' },
      { id: 'dds', label: '文档数据库服务 DDS', icon: 'Document' },
      { id: 'gaussdb', label: 'GaussDB', icon: 'DataLine', badge: '新', badgeType: 'new' },
      { id: 'redis', label: '分布式缓存服务 Redis', icon: 'Lightning' },
      { id: 'dds-mongo', label: 'GeminiDB Mongo', icon: 'Connection' },
    ],
  },
  {
    id: 'security',
    label: '安全',
    icon: 'Shield',
    items: [
      { id: 'waf', label: 'Web应用防火墙 WAF', icon: 'Shield' },
      { id: 'anti-ddos', label: 'DDoS防护 AAD', icon: 'Warning' },
      { id: 'cpts', label: '主机安全服务 HSS', icon: 'Lock' },
      { id: 'iam', label: '统一身份认证 IAM', icon: 'User' },
    ],
  },
]

export interface ResourceItem {
  id: string
  name: string
  status: 'running' | 'stopped' | 'building' | 'error'
  flavor: string
  image: string
  ip: string
  vpc: string
  az: string
  created: string
}

export const resourceData: ResourceItem[] = [
  { id: 'ecs-a1b2', name: 'web-server-01', status: 'running', flavor: 'c6s.large.2 | 2vCPUs | 4GB', image: 'CentOS 7.6 64bit', ip: '192.168.1.10', vpc: 'vpc-web', az: '可用区1', created: '2026-03-15 10:30' },
  { id: 'ecs-c3d4', name: 'web-server-02', status: 'running', flavor: 'c6s.large.2 | 2vCPUs | 4GB', image: 'CentOS 7.6 64bit', ip: '192.168.1.11', vpc: 'vpc-web', az: '可用区1', created: '2026-03-15 10:35' },
  { id: 'ecs-e5f6', name: 'db-server-master', status: 'running', flavor: 'c6s.xlarge.2 | 4vCPUs | 8GB', image: 'Ubuntu 22.04 64bit', ip: '192.168.2.10', vpc: 'vpc-db', az: '可用区2', created: '2026-03-10 08:20' },
  { id: 'ecs-g7h8', name: 'db-server-slave', status: 'running', flavor: 'c6s.xlarge.2 | 4vCPUs | 8GB', image: 'Ubuntu 22.04 64bit', ip: '192.168.2.11', vpc: 'vpc-db', az: '可用区2', created: '2026-03-10 08:25' },
  { id: 'ecs-i9j0', name: 'app-server-01', status: 'stopped', flavor: 's6.large.2 | 2vCPUs | 4GB', image: 'EulerOS 2.5 64bit', ip: '192.168.3.10', vpc: 'vpc-app', az: '可用区1', created: '2026-02-20 14:00' },
  { id: 'ecs-k1l2', name: 'app-server-02', status: 'stopped', flavor: 's6.large.2 | 2vCPUs | 4GB', image: 'EulerOS 2.5 64bit', ip: '192.168.3.11', vpc: 'vpc-app', az: '可用区1', created: '2026-02-20 14:05' },
  { id: 'ecs-m3n4', name: 'test-server', status: 'error', flavor: 't6.small.1 | 1vCPU | 1GB', image: 'Debian 11.0 64bit', ip: '-', vpc: 'vpc-test', az: '可用区1', created: '2026-04-01 09:00' },
  { id: 'ecs-o5p6', name: 'jenkins-server', status: 'running', flavor: 'm6.large.4 | 2vCPUs | 8GB', image: 'CentOS 8.2 64bit', ip: '192.168.4.10', vpc: 'vpc-devops', az: '可用区2', created: '2026-03-25 16:30' },
  { id: 'ecs-q7r8', name: 'monitor-server', status: 'running', flavor: 'c6s.large.2 | 2vCPUs | 4GB', image: 'Ubuntu 20.04 64bit', ip: '192.168.4.20', vpc: 'vpc-devops', az: '可用区2', created: '2026-03-25 16:35' },
  { id: 'ecs-s9t0', name: 'nginx-lb-01', status: 'building', flavor: 's6.medium.2 | 1vCPU | 2GB', image: 'Nginx 1.22', ip: '-', vpc: 'vpc-web', az: '可用区1', created: '2026-04-12 18:00' },
  { id: 'ecs-u1v2', name: 'redis-cache', status: 'running', flavor: 'm6.xlarge.4 | 4vCPUs | 16GB', image: 'Redis 7.0', ip: '192.168.5.10', vpc: 'vpc-db', az: '可用区2', created: '2026-03-18 11:00' },
  { id: 'ecs-w3x4', name: 'mq-server', status: 'running', flavor: 'c6s.xlarge.2 | 4vCPUs | 8GB', image: 'RabbitMQ 3.11', ip: '192.168.5.20', vpc: 'vpc-mq', az: '可用区1', created: '2026-03-22 09:15' },
]

export const statusMap: Record<string, { label: string; color: string; bgColor: string }> = {
  running: { label: '运行中', color: '#52C41A', bgColor: '#F6FFED' },
  stopped: { label: '已关机', color: '#909399', bgColor: '#F4F4F5' },
  building: { label: '创建中', color: '#0066FF', bgColor: '#E6F0FF' },
  error: { label: '异常', color: '#FF4D4F', bgColor: '#FFF1F0' },
}

export interface OverviewStat {
  label: string
  value: number
  unit: string
  trend: 'up' | 'down' | 'flat'
  trendValue: string
}

export const overviewStats: OverviewStat[] = [
  { label: '云服务器', value: 12, unit: '台', trend: 'up', trendValue: '+2' },
  { label: '运行中', value: 8, unit: '台', trend: 'up', trendValue: '+1' },
  { label: '云硬盘', value: 24, unit: '个', trend: 'flat', trendValue: '0' },
  { label: '弹性公网IP', value: 6, unit: '个', trend: 'down', trendValue: '-1' },
]

export const headerNavItems = [
  { label: '控制台', active: true },
  { label: '产品', active: false },
  { label: '解决方案', active: false },
  { label: '定价', active: false },
  { label: '文档', active: false },
]

export const regions = [
  '华北-北京一',
  '华北-北京四',
  '华东-上海一',
  '华东-上海二',
  '华南-广州',
  '西南-贵阳一',
]
