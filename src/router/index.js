import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    alwaysShow: true,
    name: 'user',
    meta: { title: '用户', icon: 'guide', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'list',
        meta: { title: '列表', icon: 'guide', noCache: true }
      },

      {
        path: 'save',
        component: () => import('@/views/user/save'),
        name: 'save',
        meta: { title: '创建', icon: 'guide', noCache: true }
      }
    ]
  },

  {
    path: '/preview',
    component: Layout,
    redirect: '/preview/treatMatch',
    alwaysShow: true,
    name: '初审',
    meta: { title: '初审', icon: 'guide', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/preview/treatMatch/index'),
        name: '文本匹配',
        meta: { title: '文本匹配', icon: 'guide', noCache: true }
      },
      {
        path: 'index',
        component: () => import('@/views/client/group/index'),
        name: '客户定位',
        meta: { title: '客户定位', icon: 'guide', noCache: true }
      },
      {
        path: 'index',
        component: () => import('@/views/client/group/index'),
        name: '理赔数据录入',
        meta: { title: '理赔数据录入', icon: 'guide', noCache: true }
      },
      {
        path: 'secondRule',
        component: () => import('@/views/preview/secondRule/index'),
        name: '二级初审规则',
        meta: { title: '二级初审规则', icon: 'guide', noCache: true }
      },
      {
        path: 'index',
        component: () => import('@/views/client/group/index'),
        name: '诊断详情',
        meta: { title: '诊断详情', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/client',
    component: Layout,
    redirect: '/client/group',
    alwaysShow: true,
    name: '客户管理',
    meta: { title: '客户管理', icon: 'guide', noCache: true },
    children: [
      {
        path: 'index',
        component: () => import('@/views/client/group/index'),
        name: '投保集团管理',
        meta: { title: '投保集团管理', icon: 'guide', noCache: true }
      },
      {
        path: 'company',
        component: () => import('@/views/client/company/index'),
        name: '直保公司管理',
        meta: { title: '直保公司管理', icon: 'guide', noCache: true }
      },
      {
        path: 'publicCoverage',
        component: () => import('@/views/client/publicCoverage/index'),
        name: '公共保额管理',
        meta: { title: '公共保额管理', icon: 'guide', noCache: true }
      },
      {
        path: 'plyPartPubCov',
        component: () => import('@/views/client/plyPartPubCov/index'),
        name: '分单公共保额管理',
        hidden: true,
        meta: { title: '分单公共保额管理', icon: 'guide', noCache: true }
      },
      {
        path: 'clientAlias',
        component: () => import('@/views/client/clientAlias/index'),
        name: '别名管理',
        meta: { title: '别名管理', icon: 'guide', noCache: true }
      },
      {
        path: 'clientLifeStyle',
        component: () => import('@/views/client/clientLifeStyle/index'),
        name: '生活方式管理',
        meta: { title: '生活方式管理', icon: 'guide', noCache: true }
      },
      {
        path: 'clientInsuranceDept',
        component: () => import('@/views/client/clientInsuranceDept/index'),
        name: '投保单位',
        meta: { title: '投保单位', icon: 'guide', noCache: true }
      },
      {
        path: 'clientCompany',
        component: () => import('@/views/client/clientCompany/index'),
        name: '投保公司',
        meta: { title: '投保公司', icon: 'guide', noCache: true }
      },
      {
        path: 'clientNaturalPersion',
        component: () => import('@/views/client/clientNaturalPersion/index'),
        name: '自然人管理',
        meta: { title: '自然人管理', icon: 'guide', noCache: true }
      },
      {
        path: 'clientBankAcctInfo',
        component: () => import('@/views/client/clientBankAcctInfo/index'),
        name: '银行账号信息',
        meta: { title: '银行账号信息', icon: 'guide', noCache: true }
      },
      {
        path: 'clientSubInsuranceDept',
        component: () => import('@/views/client/clientSubInsuranceDept/index'),
        name: '子投保单位管理',
        meta: { title: '子投保单位管理', icon: 'guide', noCache: true }
      },
      {
        path: 'clientworkplace',
        component: () => import('@/views/client/clientworkplace/index'),
        name: '社保地区管理',
        meta: { title: '社保地区管理', icon: 'guide', noCache: true }
      },

      {
        path: 'insuranceCompany',
        component: () => import('@/views/client/insuranceCompany/index'),
        name: '保险公司',
        meta: { title: '保险公司', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/productData',
    component: Layout,
    redirect: '/productData/product',
    alwaysShow: true,
    name: '产品数据配置',
    meta: { title: '产品数据配置', icon: 'guide', noCache: true },
    children: [
      {
        path: 'product',
        component: () => import('@/views/productData/product/index'),
        name: '产品',
        meta: { title: '产品', icon: 'guide', noCache: true }
      },
      {
        path: 'insuranceType',
        component: () => import('@/views/productData/insuranceType/index'),
        name: '险种',
        meta: { title: '险种', icon: 'guide', noCache: true }
      },
      {
        path: 'proDuty',
        component: () => import('@/views/productData/proDuty/index'),
        name: '责任',
        meta: { title: '责任', icon: 'guide', noCache: true }
      },
      {
        path: 'dataMatch',
        component: () => import('@/views/productData/dataMatch/index'),
        name: '甲方金科匹配',
        meta: { title: '甲方金科匹配', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/param',
    component: Layout,
    redirect: '/pram/paramManage',
    alwaysShow: true,
    name: '通用编码',
    meta: { title: '通用编码', icon: 'guide', noCache: true },
    children: [
      {
        path: 'paramManage',
        component: () => import('@/views/param/paramManage/index'),
        name: '通用参数',
        meta: { title: '通用参数', icon: 'guide', noCache: true }
      },
      {
        path: 'sicknessScope',
        component: () => import('@/views/param/sicknessScope/index'),
        name: '疾病范围',
        meta: { title: '疾病范围', icon: 'guide', noCache: true }
      },
      {
        path: 'diagnosisManage',
        component: () => import('@/views/param/diagnosisManage/index'),
        name: '诊断管理',
        meta: { title: '诊断管理', icon: 'guide', noCache: true }
      },
      {
        path: 'serviceLine',
        component: () => import('@/views/param/serviceLine/index'),
        name: '业务线',
        meta: { title: '业务线', icon: 'guide', noCache: true }
      },
      {

        path: 'socialinsuAddr',
        component: () => import('@/views/param/socialinsuAddr/index'),
        name: '社保地',
        meta: { title: '社保地', icon: 'guide', noCache: true }
      },
      {
        path: 'quotaCodeConfig',
        component: () => import('@/views/param/quotaCodeConfig/index'),
        name: '限额代码类型配置',
        meta: { title: '限额代码类型配置', icon: 'guide', noCache: true }
      },
      {
        path: 'claimSpecialDefi',
        component: () => import('@/views/param/claimSpecialDefi/index'),
        name: '理赔审核规则定义',
        meta: { title: '理赔审核规则定义', icon: 'guide', noCache: true }
      },
      {
        path: 'accidentDiaCde',
        component: () => import('@/views/param/accidentDiaCde/index'),
        name: '意外诊断码',
        meta: { title: '意外诊断码', icon: 'guide', noCache: true }
      },
      {
        path: 'waitPeriod',
        component: () => import('@/views/param/waitPeriod/index'),
        name: '等待期',
        meta: { title: '等待期', icon: 'guide', noCache: true }
      },
      {
        path: 'medicalNetworkDetail',
        component: () => import('@/views/param/medicalNetworkDetail/index'),
        name: '医院网络码',
        meta: { title: '医院网络码', icon: 'guide', noCache: true }
      },
      {
        path: 'medicareUseRule',
        component: () => import('@/views/param/medicareUseRule/index'),
        name: '医保卡使用规则',
        meta: { title: '医保卡使用规则', icon: 'guide', noCache: true }
      },
      {
        path: 'speDisease',
        component: () => import('@/views/param/speDisease/index'),
        name: '门诊特殊病',
        meta: { title: '门诊特殊病', icon: 'guide', noCache: true }
      },
      {
        path: 'dutySertypMatching',
        component: () => import('@/views/param/dutySertypMatching/index'),
        name: '责任服务类型匹配',
        meta: { title: '责任服务类型匹配', icon: 'guide', noCache: true }
      },
      {
        path: 'diagnosisMatching',
        component: () => import('@/views/param/diagnosisMatching/index'),
        name: '诊断匹配管理',
        meta: { title: '诊断匹配管理', icon: 'guide', noCache: true }
      },
      {
        path: 'amtConfig',
        component: () => import('@/views/param/amtConfig/index'),
        name: '集团公共保额',
        meta: { title: '集团公共保额', icon: 'guide', noCache: true }
      },
      {
        path: 'adjustmentOrder',
        component: () => import('@/views/param/adjustmentOrder/index'),
        name: '理算顺序',
        meta: { title: '理算顺序', icon: 'guide', noCache: true }
      },
      {
        path: 'ciRate',
        component: () => import('@/views/param/ciRate/index'),
        name: '赔付比例',
        meta: { title: '赔付比例', icon: 'guide', noCache: true }
      },
      {
        path: 'hospitalzationAllowance',
        component: () => import('@/views/param/hospitalzationAllowance/index'),
        name: '津贴',
        meta: { title: '津贴', icon: 'guide', noCache: true }
      },
      {
        path: 'exclusionsDuty',
        component: () => import('@/views/param/exclusionsDuty/index'),
        name: '除外责任',
        meta: { title: '除外责任', icon: 'guide', noCache: true }
      },
      {
        path: 'claimSpecialMatch',
        component: () => import('@/views/param/claimSpecialMatch/index'),
        name: '理赔审核规则匹配',
        meta: { title: '理赔审核规则匹配', icon: 'guide', noCache: true }
      },
      {
        path: 'explainNo',
        component: () => import('@/views/param/explainNo/index'),
        name: '结论说明码',
        meta: { title: '结论说明码', icon: 'guide', noCache: true }
      },
      {
        path: 'consultDefi',
        component: () => import('@/views/param/consultDefi/index'),
        name: '就诊定义',
        hidden: true,
        meta: { title: '就诊定义', icon: 'guide', noCache: true }
      }, {
        path: 'medicdutyLimit',
        component: () => import('@/views/param/medicdutyLimit/index'),
        name: '责任范围',
        // hidden: true,
        meta: { title: '责任范围', icon: 'guide', noCache: true }
      },
      {
        path: 'serviceTypManage',
        component: () => import('@/views/param/serviceTypManage/index'),
        name: '服务类型管理',
        meta: { title: '服务类型管理', icon: 'guide', noCache: true }
      },
      {
        path: 'dutySevParamMatch',
        component: () => import('@/views/param/dutySevParamMatch/index'),
        name: '责任服务类型参数匹配',
        meta: { title: '责任服务类型参数匹配', icon: 'guide', noCache: true }
      },
      {
        path: 'quotaConfig',
        component: () => import('@/views/param/quotaConfig/index'),
        name: '限额',
        meta: { title: '限额', icon: 'guide', noCache: true }
      },
      {
        path: 'deductibleExcessConfig',
        component: () => import('@/views/param/deductibleExcessConfig/index'),
        name: '免赔额',
        meta: { title: '免赔额', icon: 'guide', noCache: true }
      },
      {
        path: 'pastIllnes',
        component: () => import('@/views/param/pastIllnes/index'),
        name: '既往病史',
        meta: { title: '既往病史', icon: 'guide', noCache: true }
      },
      {
        path: 'diagnosisConvert',
        component: () => import('@/views/param/diagnosisConvert/index'),
        name: '诊断转换',
        meta: { title: '诊断转换', icon: 'guide', noCache: true }
      },
      {
        path: 'amountQuota',
        component: () => import('@/views/param/amountQuota/index'),
        name: '合计限额',
        meta: { title: '合计限额', icon: 'guide', noCache: true }
      },
      {
        path: 'amountDeductible',
        component: () => import('@/views/param/amountDeductible/index'),
        name: '合计免赔额',
        meta: { title: '合计免赔额', icon: 'guide', noCache: true }
      },
      {
        path: 'quotaDetail',
        component: () => import('@/views/param/quotaDetail/index'),
        name: '限额阶梯明细',
        meta: { title: '限额阶梯明细', icon: 'guide', noCache: true }
      },
      {
        path: 'serviceTreatmentMatching',
        component: () => import('@/views/param/serviceTreatmentMatching/index'),
        name: '服务诊疗匹配',
        meta: { title: '服务诊疗匹配', icon: 'guide', noCache: true }
      },
      {
        path: 'treatmentMesManage',
        component: () => import('@/views/param/treatmentMesManage/index'),
        name: '诊疗信息管理',
        meta: { title: '诊疗信息管理', icon: 'guide', noCache: true }
      },
      {
        path: 'baseAdjustOrder',
        component: () => import('@/views/param/baseAdjustOrder/index'),
        name: '基础理算顺序',
        meta: { title: '基础理算顺序', icon: 'guide', noCache: true }
      },
      {
        path: 'cardPeriod',
        component: () => import('@/views/param/cardPeriod/index'),
        name: '办卡期',
        meta: { title: '办卡期', icon: 'guide', noCache: true }
      },
      {
        path: 'entityNorm',
        component: () => import('@/views/param/entityNorm/index'),
        name: '实体限额',
        meta: { title: '实体限额', icon: 'guide', noCache: true }
      }

    ]
  },
  {
    path: '/medical',
    component: Layout,
    redirect: '/medical/medicalGroup',
    alwaysShow: true,
    name: '医疗机构配置',
    meta: { title: '医疗机构配置', icon: 'guide', noCache: true },
    children: [
      {
        path: 'medicalGroup',
        component: () => import('@/views/medical/medicalGroup/index'),
        name: '医疗集团管理',
        meta: { title: '医疗集团管理', icon: 'guide', noCache: true }
      },
      {
        path: 'hospitalManage',
        component: () => import('@/views/medical/hospitalManage/index'),
        name: '医院管理',
        meta: { title: '医院管理', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/dict',
    alwaysShow: true,
    name: '系统设置',
    meta: { title: '系统设置', icon: 'guide', noCache: true },
    children: [
      {
        path: 'dict',
        component: () => import('@/views/system/dict/index'),
        name: '人员字典管理',
        meta: { title: '人员字典管理', icon: 'guide', noCache: true }
      },
      {
        path: 'area',
        component: () => import('@/views/system/area/index'),
        name: '人员地区配置',
        meta: { title: '人员地区配置', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/ply',
    alwaysShow: true,
    name: '保单数据配置',
    meta: { title: '保单数据配置', icon: 'guide', noCache: true },
    children: [
      {
        path: 'ply',
        component: () => import('@/views/config/ply/index'),
        name: '保单配置',
        meta: { title: '保单配置', icon: 'guide', noCache: true }
      },
      {
        path: 'plyTreeConfig',
        component: () => import('@/views/config/ply/treeConfig'),
        name: '保单投保等级',
        meta: { title: '保单投保等级', icon: 'guide', noCache: true }
      },
      {
        path: 'plypart',
        component: () => import('@/views/config/plyPart/index'),
        name: '分单配置',
        meta: { title: '分单配置', icon: 'guide', noCache: true }
      }
    ]
  },

  {
    path: '/claim',
    component: Layout,
    redirect: '/claim/batch',
    alwaysShow: true,
    name: '理赔',
    meta: { title: '理赔', icon: 'guide', noCache: true },
    children: [
      {
        path: 'batch',
        component: () => import('@/views/claim/batch/index'),
        name: '批次理赔信息',
        meta: { title: '批次理赔信息', icon: 'guide', noCache: true }
      },
      {
        path: 'apply',
        component: () => import('@/views/claim/apply/index'),
        name: '申请理赔信息',
        meta: { title: '申请理赔信息', icon: 'guide', noCache: true }
      },
      {
        path: 'duty',
        component: () => import('@/views/claim/duty/index'),
        name: '理赔责任信息',
        meta: { title: '理赔责任信息', icon: 'guide', noCache: true }
      },
      {
        path: 'visit',
        component: () => import('@/views/claim/visit/index'),
        name: '理赔就诊信息',
        meta: { title: '理赔就诊信息', icon: 'guide', noCache: true }
      },
      {
        path: 'inv',
        component: () => import('@/views/claim/inv/index'),
        name: '理赔发票信息',
        meta: { title: '理赔发票信息', icon: 'guide', noCache: true }
      },
      {
        path: 'treat',
        component: () => import('@/views/claim/treat/index'),
        name: '诊疗明细信息',
        meta: { title: '诊疗明细信息', icon: 'guide', noCache: true }
      },
      {
        path: 'deduct',
        component: () => import('@/views/claim/deduct/index'),
        name: '理赔扣减信息',
        meta: { title: '理赔扣减信息', icon: 'guide', noCache: true }
      }
    ]
  },

  // {
  //   path: '/demo/index',
  //   component: () => import('@/views/demo/index'),
  //   hidden: true
  // },
  // {
  //   path: '/demo/edit',
  //   component: () => import('@/views/demo/edit'),
  //   hidden: true
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'exportZip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'pdf', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'clipboardDemo', icon: 'clipboard' }
      }
    ]
  },

  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'externalLink', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
