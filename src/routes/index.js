/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
    // Main Layout Pages
    {
        path: '/',
        redirect: {
            name: 'Home'
        },
        meta: {
            requiresAuth: true
        },
        component: () => import('../views/layouts/main'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('../views/Home')
            },
            {
                path: '/account',
                name: 'Account',
                component: () => import('../views/Account/Index')
            },

            {
                path: '/settings',
                name: 'Settings',
                component: () => import('../views/Settings')
            },
            {
                path: '/social-media',
                name: 'SocialMedia',
                component: () => import('../views/SocialMedia')
            },
            // {
            //     path: '/rewards',
            //     name: 'Rewards',
            //     component: () => import('../views/Reward/AllRewards')
            // },
            // {
            //     path: '/rewards/new',
            //     name: 'RewardsNew',
            //     component: () => import('../views/Reward/Editor')
            // },
            // {
            //     path: '/rewards/:id',
            //     name: 'RewardsEdit',
            //     component: () => import('../views/Reward/Editor')
            // },
            // Loyalty pages
            {
                path: '/referred-by-me',
                name: 'RefByMe',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Loyalty/RefByMe')
            },
            {
                path: '/wallet-drop',
                name: 'WalletDrop',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Loyalty/WalletDrop')
            },
            {
                path: '/lottery',
                name: 'Lottery',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Loyalty/Lottery')
            },
            // Surveys pages
            {
                path: '/surveys',
                name: 'Surveys',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/AllSurveys.vue')
            },
            {
                path: '/surveys/new',
                name: 'SurveysNew',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/Editor')
            },
            {
                path: '/surveys/:id',
                name: 'SurveysActivate',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/Activate')
            },
            {
                path: '/surveys/:id/edit',
                name: 'SurveysEdit',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/Editor')
            },
            {
                path: '/surveys/:id/statistics',
                name: 'SurveysStatistics',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/Statistics')
            },
            // Quizzes pages
            {
                path: '/quizzes',
                name: 'Quizzes',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/AllQuizzes')
            },
            {
                path: '/quizzes/new',
                name: 'QuizzesNew',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/Editor')
            },
            {
                path: '/quizzes/:id',
                name: 'QuizzesActivate',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/Activate')
            },
            {
                path: '/quizzes/:id/edit',
                name: 'QuizzesEdit',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/Editor')
            },
            {
                path: '/quizzes/:id/statistics',
                name: 'QuizzesStatistics',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/Statistics')
            },
            // Reviews Pages
            {
                path: '/reviews',
                name: 'ReviewByMe',
                component: () => import('../views/Review/AllReviews')
            },
            {
                path: '/reviews/:folder',
                name: 'ReviewsFolder',
                component: () => import('../views/Review/AllReviews')
            },
            {
                path: '/reviews/:id/edit',
                name: 'ReviewsEdit',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Review/Editor')
            },
            {
                path: '/reviews/new',
                name: 'ReviewsNew',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Review/Editor')
            },
            {
                //@TODO: This dashboard is not in integrations. It belongs to reviews.
                path: '/reviews/dashboard',
                name: 'QuicksightDashboard',
                component: () => import('../views/Review/QuicksightDashboard')
            },

            // Integrations
            {
                path: '/integrations',
                name: 'Integrations',
                component: () => import('../views/Integrations/AllIntegrations')
            },
            {
                path: '/integrations/segment',
                name: 'Segment',
                component: () => import('../views/Integrations/Segment')
            },
            {
                path: '/integrations/countr',
                name: 'Countr',
                component: () => import('../views/Integrations/Countr')
            },
            {
                path: '/integrations/mailchimp',
                name: 'Mailchimp',
                component: () => import('../views/Integrations/Mailchimp')
            },
            {
                path: '/integrations/quicksight',
                name: 'Quicksight',
                component: () => import('../views/Integrations/Quicksight')
            },
            {
                path: '/integrations/woocommerce',
                name: 'Woocommerce',
                component: () => import('../views/Integrations/WooCommerce')
            },
            {
                path: '/integrations/bricklink',
                name: 'Bricklink',
                component: () => import('../views/Integrations/Bricklink')
            },
            {
                path: '/integrations/mandrill',
                name: 'Mandrill',
                component: () => import('../views/Integrations/Mandrill')
            },
            {
                path: '/integrations/calendly',
                name: 'Calendly',
                component: () => import('../views/Integrations/Calendly')
            },
            {
                path: '/integrations/zoom',
                name: 'Zoom',
                component: () => import('../views/Integrations/Zoom')
            },

            // Email Builder
            {
                path: '/email',
                name: 'EmailBuilder',
                component: () => import('../views/EmailBuilder')
            },
            {
                path: '/email/builder',
                name: 'EmailBuilder/builder',
                component: () => import('../views/EmailBuilder/builder')
            },
            {
                path: '/email/templates',
                name: 'EmailBuilder/templates',
                component: () => import('../views/EmailBuilder/templates')
            },

            // Page Builder,
            {
                path: '/page-builder',
                name: 'PageBuilder',
                component: () => import('../views/PageBuilder')
            },
            {
                path: '/page-builder/new-page',
                name: 'PageBuilder/newPage',
                component: () => import('../views/PageBuilder/new-page')
            },
            {
                path: '/page-builder/page',
                name: 'PageBuilder/page',
                component: () => import('../views/PageBuilder/page')
            },
            {
                path: '/page-builder/pages',
                name: 'PageBuilder/pages',
                component: () => import('../views/PageBuilder/all_pages')
            },
            {
                path: '/page-builder/provision-page',
                name: 'PageBuilder/provision-page',
                component: () => import('../views/PageBuilder/provision-page')
            },
            // Reward Engine
            {
                path: '/reward-engine',
                name: 'RewardEngine',
                component: () => import('../views/RewardEngine')
            },
            //Reward classes
            {
                path: '/reward-classes',
                name: 'RewardClasses',
                component: () => import('../views/RewardClasses')
            },
            //Add new Reward class
            {
                path: '/add-reward-class',
                name: 'AddRewardClass',
                component: () =>
                    import('../views/RewardClasses/components/AddRewardClass')
            },
            //Add  Reward class -Points (general)
            {
                path: '/Rewards-Points-General',
                name: 'Rewards-Points-General',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/General'
                    )
            },
            //Add  Reward class - Points (images)
            {
                path: '/Rewards-Points-Images',
                name: 'Rewards-Points-Images',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/Images'
                    )
            },
            //Add  Reward class - Points (distribution)
            {
                path: '/Rewards-Points-Distribution',
                name: 'Rewards-Points-Distribution',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/Distribution'
                    )
            },
            //Add  Reward class - Points (personalization)
            {
                path: '/Rewards-Points-Personalization',
                name: 'Rewards-Points-Personalization',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/Personalization'
                    )
            },
            //Add  Reward class - Points (data science)
            {
                path: '/Rewards-Points-Data-Science',
                name: 'Rewards-Points-Data-Science',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/DataScience'
                    )
            },
            //Add  Reward class - Points (images upload)
            {
                path: '/Rewards-Points-Image-Upload',
                name: 'Rewards-Points-Image-Upload',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassPoints/ImageUpload'
                    )
            },
            //Add  Reward class - Coupon (general)
            {
                path: '/Rewards-Coupon-General',
                name: 'Rewards-Coupon-General',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/General'
                    )
            },
            //Add  Reward class - Coupon (images upload)
            {
                path: '/Rewards-Coupon-Images',
                name: 'Rewards-Coupon-Images',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Images'
                    )
            },
            //Add  Reward class - Coupon (Distribution)
            {
                path: '/Rewards-Coupon-Distribution',
                name: 'Rewards-Coupon-Distribution',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Distribution'
                    )
            },
            //Add  Reward class - Coupon (personalization)
            {
                path: '/Rewards-Coupon-Personalization',
                name: 'Rewards-Coupon-Personalization',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Personalization'
                    )
            },
            //Add  Reward class - Coupon (data science)
            {
                path: '/Rewards-Coupon-Data-Science',
                name: 'Rewards-Coupon-Data-Science',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/DataScience'
                    )
            },
            //Add  Reward class - Coupon - Redeem (Omni Channel)
            {
                path: '/Rewards-Coupon-Redeem-OmniChannel',
                name: 'Rewards-Coupon-Redeem-OmniChannel',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Redeem/OmniChannel'
                    )
            },
            //Add  Reward class - Coupon - Redeem (Coalition)
            {
                path: '/Rewards-Coupon-Redeem-Coalition',
                name: 'Rewards-Coupon-Redeem-Coalition',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Redeem/Coalition'
                    )
            },
            //Add  Reward class - Coupon - Redeem (Value)
            {
                path: '/Rewards-Coupon-Redeem-Value',
                name: 'Rewards-Coupon-Redeem-Value',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Redeem/Value'
                    )
            },
            //Add  Reward class - Coupon - Redeem (Categories)
            {
                path: '/Rewards-Coupon-Redeem-Categories',
                name: 'Rewards-Coupon-Redeem-Categories',
                component: () =>
                    import(
                        '../views/RewardClasses/components/RewardClassCoupon/Redeem/Categories'
                    )
            },
            // Reward Rules
            {
                path: '/reward-rules',
                name: 'RewardRules',
                component: () => import('../views/RewardRules')
            },

            // Leaderboards
            {
                path: '/leaderboards',
                name: 'Leaderboards',
                component: () => import('../views/Leaderboard')
            },
            {
                path: '/leaderboards/add',
                name: 'AddLeaderboard',
                component: () => import('../views/Leaderboard/AddLeaderboard')
            },
            {
                path: '/leaderboards/settings',
                name: 'LeaderboardSettings',
                component: () => import('../views/Leaderboard/Settings')
            },
            {
                path: '/leaderboards/settings/general',
                name: 'LeaderboardGeneralSettings',
                component: () => import('../views/Leaderboard/GeneralSettings')
            },
            {
                path: '/leaderboards/settings/colors',
                name: 'LeaderboardColorsSettings',
                component: () => import('../views/Leaderboard/ColorsSettings')
            },
            {
                path: '/leaderboards/settings/embed',
                name: 'LeaderboardEmbedSettings',
                component: () => import('../views/Leaderboard/EmbedSettings')
            },
            {
                path: '/leaderboards/settings/images',
                name: 'LeaderboardImagesSettings',
                component: () => import('../views/Leaderboard/ImagesSettings')
            },

            // Traffic Routes
            {
                path: '/traffic-routes',
                name: 'TrafficRoutes',
                component: () => import('../views/TrafficRoutes')
            },
            {
                path: '/traffic-routes/add-route',
                name: 'AddNewTrafficRoute',
                component: () =>
                    import('../views/TrafficRoutes/AddTrafficRoute')
            },
            {
                path: '/traffic-routes/:id/edit',
                name: 'EditTrafficRoute',
                component: () =>
                    import('../views/TrafficRoutes/AddTrafficRoute')
            },

            // Webhooks
            {
                path: '/webhooks',
                name: 'Webhooks',
                component: () => import('../views/Webhooks')
            },
            {
                path: '/webhooks/add',
                name: 'AddWebhook',
                component: () => import('../views/Webhooks/AddWebhook')
            },
            {
                path: '/webhooks/:id/edit',
                name: 'EditWebhook',
                component: () => import('../views/Webhooks/AddWebhook')
            },

            // Personas
            {
                path: '/personas',
                name: 'Personas',
                component: () => import('../views/Personas')
            },
            {
                path: '/personas/add-personas',
                name: 'AddPersonas',
                component: () =>
                    import('../views/Personas/AddPersonas')
            },
            {
                path: '/personas/:id/edit',
                name: 'EditPersonas',
                component: () =>
                    import('../views/Personas/AddPersonas')
            },
            {
                path: '/personas-list',
                name: 'PersonasList',
                component: () =>
                    import('../views/Personas/PersonasList')
            },
            {
                path: '/personas/configure-trait',
                name: 'ConfigureTrait',
                component: () =>
                    import('../views/Personas/ConfigureTrait')
            },
            

            // Audiences
            {
                path: '/audiences',
                name: 'Audiences',
                component: () => import('../views/Audiences')
            },
            {
                path: '/audiences-list',
                name: 'AudiencesList',
                component: () =>
                    import('../views/Audiences/AudiencesList')
            },

            // Apple Wallet
            {
                path: '/apple-wallet',
                name: 'AppleWallet',
                component: () => import('../views/AppleWallet')
            },
            {
                path: '/add-template',
                name: 'AddTemplate',
                component: () => import('../views/AppleWallet/AddTemplate')
            },
            {
                path: '/apple-wallet/settings',
                name: 'TemplateSettings',
                component: () =>
                    import('../views/AppleWallet/Components/Settings')
            },
            {
                path: '/apple-wallet/settings/general',
                name: 'TemplateGeneralSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/GeneralSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/images',
                name: 'TemplateImageSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/ImageSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/colors',
                name: 'TemplateColorsSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/ColorsSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/barcode',
                name: 'TemplateBarcodeSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/BarcodeSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/header',
                name: 'TemplateHeaderSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/HeaderSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/primary',
                name: 'TemplatePrimarySettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/PrimarySettings'
                    )
            },
            {
                path: '/apple-wallet/settings/secondary',
                name: 'TemplateSecondarySettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/SecondarySettings'
                    )
            },
            {
                path: '/apple-wallet/settings/auxiliary',
                name: 'TemplateAuxiliarySettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/AuxiliarySettings'
                    )
            },
            {
                path: '/apple-wallet/settings/app',
                name: 'TemplateAppSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/AppSettings'
                    )
            },
            {
                path: '/apple-wallet/settings/nfc',
                name: 'TemplateNFCSettings',
                component: () =>
                    import(
                        '../views/AppleWallet/Components/Settings/NFCSettings'
                    )
            },
            {
                path: '/emailbroadcasts',
                name: 'EmailBroadcasts',
                component: () => import('../views/EmailCampaign')
            },
            {
                path: '/emailbroadcasts/add',
                name: 'EmailBroadcastsAddCampaign',
                component: () =>
                    import('../views/EmailCampaign/AddEmailCampaign')
            },
            {
                path: '/emailbroadcasts/:id',
                name: 'EmailBroadcastsStatistics',
                component: () =>
                    import('../views/EmailCampaign/StatisticsEmailCampaign')
            },
            {
                path: '/segments',
                name: 'AudienceSegments',
                component: () => import('../views/EmailCampaign/segments')
            },
            {
                path: '/segments/add',
                name: 'AudienceSegmentsAdd',
                component: () =>
                    import('../views/EmailCampaign/segments/AddSegment')
            },
            {
                path: '/senders',
                name: 'EmailSenders',
                component: () => import('../views/EmailCampaign/senders/')
            },
            {
                path: '/senders/add',
                name: 'EmailSendersAdd',
                component: () =>
                    import('../views/EmailCampaign/senders/AddSender')
            },
            //Campaign
            {
                path: '/campaign/performance',
                name: 'Performance',
                component: () => import('../views/Campaign/Performance')
            },
            {
                path: '/campaign/performance/create',
                name: 'PerformanceCreateCampaign',
                component: () =>
                    import('../views/Campaign/Performance/CreateCampaign')
            },
            {
                path: '/campaign/goals',
                name: 'Goals',
                redirect: { name: 'GoalsTargetAudience' }
            },
            {
                path: '/campaign/goals/target-audience',
                name: 'GoalsTargetAudience',
                component: () =>
                    import('../views/Campaign/Goals/TargetAudience')
            },
            {
                path: '/campaign/goals/incentivized-action',
                name: 'GoalsIncentivizedAction',
                component: () =>
                    import('../views/Campaign/Goals/IncentivizedAction')
            },
            {
                path: '/campaign/goals/engagement-goal',
                name: 'GoalsEngagementGoal',
                component: () =>
                    import('../views/Campaign/Goals/EngagementGoal')
            },
            // campaign landing pages
            {
                path: '/campaign/landing-pages',
                name: 'CampaignLandingPages',
                component: () => import('../views/Campaign/LandingPages/')
            },
            {
                path: '/campaign/landing-pages/traffic-routes',
                name: 'CampaignLandingPagesTrafficRoutes',
                component: () =>
                    import('../views/Campaign/LandingPages/TrafficRoutes')
            },
            {
                path: '/campaign/rewards',
                name: 'Rewards',
                component: () => {}
            },
            {
                path: '/campaign/promotion',
                name: 'Promotion',
                component: () => {}
            },
            {
                path: '/campaign/notifications',
                name: 'Notifications',
                component: () => {}
            },
            {
                path: '/campaign/data',
                name: 'Data',
                component: () => {}
            },
            // Loyalty programs
            {
                path: '/loyalty-programs',
                name: 'LoyaltyPrograms',
                component: () => import('../views/LoyaltyPrograms')
            },
            {
                path: '/loyalty-programs/add',
                name: 'LoyaltyProgramsAddProgram',
                component: () => import('../views/LoyaltyPrograms/AddProgram')
            },
            {
                path: '/loyalty-programs/:id',
                name: 'LoyaltyProgramsEditProgram',
                component: () => import('../views/LoyaltyPrograms/AddProgram')
            },
            {
                path: '/loyalty-programs/:programId/members/add',
                name: 'LoyaltyProgramsMemberAdd',
                component: () => import('../views/LoyaltyPrograms/MemberEdit')
            },
            {
                path: '/loyalty-programs/:programId/members/:id',
                name: 'LoyaltyProgramsMemberEdit',
                component: () => import('../views/LoyaltyPrograms/MemberEdit')
            },
            // Email Rules
            {
                path: '/email-rules',
                name: 'EmailRules',
                component: () => import('../views/EmailRules')
            },
            {
                path: '/email-rules/event/add',
                name: 'EmailRulesEventAdd',
                component: () => import('../views/EmailRules/AddRule')
            }
        ]
    },

    // Survey/quiz preview pages
    {
        path: '/preview',
        component: () => import('../views/layouts/default'),
        children: [
            {
                path: '/preview/survey/:id',
                name: 'SurveysPreview',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Survey/Preview')
            },
            {
                path: '/preview/quiz/:id',
                name: 'QuizzesPreview',
                meta: {
                    requiredRewards: true
                },
                component: () => import('../views/Quiz/Preview')
            }
        ]
    },

    // Auth Layout pages
    {
        path: '/',
        component: () => import('../views/layouts/auth'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/signup',
                name: 'CreateAccount',
                component: () => import('../views/CreateAccount')
            }
        ]
    },

    // Callback page
    {
        path: '/callback',
        name: 'Callback',
        component: () => import('../views/Callback')
    },

    // Handle Not Found
    {
        path: '/not-found',
        name: 'NotFounded',
        component: () => import('../views/NotFound')
    },

    // Redirect all other pages to Not Found page
    {
        path: '*',
        redirect: '/not-found'
    }
];
