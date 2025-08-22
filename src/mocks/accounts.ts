import type { AccountsResponse, AccountsWithSessionsResponse } from '../types/acounts';

export const mockAccountsResponse: AccountsResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    accounts: [
      {
        "accountId": "57f4d42372699e61b2ef8cb8",
        "accountName": "Punto Tattoo",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "58f4e7c9236e3c6b3d54ac33",
        "accountName": "CALMA Casa de Estética",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "5ab16ac866b0d65bcd57cb0a",
        "accountName": "Yin Spa",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "5dedb0022921120d083d40fb",
        "accountName": "MCH Medicine & Wellness ",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "5ef22b0b7a226d328f51265a",
        "accountName": "Centro QuiroPractico Alfalla",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "61fa5a35f1ce7f1f2eb26bb4",
        "accountName": "Almar Hospitalet",
        "hasAutomode": true,
        "onboardingCurrentState": "FAILED",
        "active": false,
        "base": 50,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 50,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "6400a56bdf93302b6e82bd7d",
        "accountName": "Arenados y Granallado San Martin",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400017463",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400abca1fb4de940e7eebbb",
        "accountName": "Colaneri Motos",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400043909",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400b724ca33cfe6cb2877f5",
        "accountName": "Farmacia Godoy",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400050087",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400b824682fbc73b7e78816",
        "accountName": "Taller Mecanica Integral Fg",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400052158",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400be9299bdcb6fc842c962",
        "accountName": "Kafalas Establecimiento Olivicola",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400076032",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400beb6b58773c991f6888f",
        "accountName": "El Emporio del Asiento Sanitario",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400076509",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400c9ed99bdcb6fc8443ea6",
        "accountName": "CICCIU - CAJAS AUTOMATICAS",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400106170",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "6400d88b4caadaec67b504b4",
        "accountName": "Escribano Oro Guillermo R",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400147538",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6400fd564caadaec67ba59e2",
        "accountName": "Estudio Ceci - Pérez y Asociados",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400218242",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64010542020212c97d8315d7",
        "accountName": "Motomania",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400238623",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640106de4caadaec67bb7a58",
        "accountName": "Autopartes Citroën Peugeot Guillermo",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400243126",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64010ca14caadaec67bc3ddd",
        "accountName": "Hidroclor SRL - Prod Quimicos",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400265399",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6401135999bdcb6fc84df38c",
        "accountName": "Aserradero Garbarino",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400287772",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "640115ef99bdcb6fc84e4812",
        "accountName": "Organización Fissore",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400297933",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "64011ece4caadaec67be7d17",
        "accountName": "Gaetano Sassano - Alta Costura",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400333163",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640127284caadaec67bf67b3",
        "accountName": "Flexograf SRL",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400388334",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64012c224caadaec67c009ca",
        "accountName": "Taller Saladillo",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400451578",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64012f484caadaec67c05a63",
        "accountName": "BOTONERA LAVALLE",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400478410",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 4,
        "extra": 0,
        "totalAvailable": 496,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64012ffa99bdcb6fc8514c6d",
        "accountName": "Curto Martins Materiales",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400485106",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640143bf4caadaec67c2bbe9",
        "accountName": "Iglesia Evangelica Bautista",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400657033",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640143c799bdcb6fc85374a5",
        "accountName": "Maquimetal Rodamientos de Jorge Navas",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400657063",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6401489f99bdcb6fc853e670",
        "accountName": "Raster Seguridad Privada",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400701970",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64014dd74caadaec67c3cae3",
        "accountName": "Gomeria Aranciaga - Dolores",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400745142",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64014f5399bdcb6fc8549f44",
        "accountName": "Ferretería Veltens",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400758807",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "640152204caadaec67c42ee0",
        "accountName": "ALERTA FUMIGACIONES",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400784345",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "6401585b99bdcb6fc855805e",
        "accountName": "Felipe Hnos",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400804354",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "640158b899bdcb6fc85588c3",
        "accountName": "Itat - Ingenieria Tecnica de Alta Tension",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400804888",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64015cbe99bdcb6fc8560603",
        "accountName": "La Ferretería Industrial San Lorenzo",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400808482",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "640165194caadaec67c62ca2",
        "accountName": "FERRETERIA CORRIENTES",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400816302",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640166b499bdcb6fc8570953",
        "accountName": "Geriátrico Residencia Nathaniel",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400817372",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 17,
        "extra": 0,
        "totalAvailable": 483,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "6401676e99bdcb6fc85715ed",
        "accountName": "Farmacia Popular",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400818072",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "64016ef34caadaec67c6e355",
        "accountName": "Pinturas Mixsol",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400841317",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "640170fa4caadaec67c6fd08",
        "accountName": "Electro Colon",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400858365",
        "hasAutomode": false,
        "onboardingCurrentState": "",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": false
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
        "accountId": "640176884caadaec67c74d9c",
        "accountName": "Helados Eduardiko",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400889844",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": true
            },
            {
                "type": "web",
                "active": false
            }
        ]
    },
    {
        "accountId": "64017a4c99bdcb6fc8584369",
        "accountName": "Miami Sun Estética y Spa",
        "apiProvider": "6331d0e09660361198fdd08d",
        "externalId": "0005400912276",
        "hasAutomode": true,
        "onboardingCurrentState": "COMPLETED",
        "active": false,
        "base": 500,
        "baseUsed": 0,
        "extra": 0,
        "totalAvailable": 500,
        "channels": [
            {
                "type": "whatsapp",
                "active": true
            },
            {
                "type": "web",
                "active": true
            }
        ]
    },
    {
      "accountId": "689f2fcabdf70a6b4b27da78",
      "accountName": "Mariela Essen",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816494",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "689f2fce9e22550633c1d071",
      "accountName": "Sillage Perfumes Sf",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816503",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "689f2fd29e22550633c1d0e9",
      "accountName": "Arroyito Mates",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816509",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "689f456ebdf70a6b4b27eeba",
      "accountName": "INVERSIONES VR & CIA SAS",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643557",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "689f71f89e22550633c22dc2",
      "accountName": "Xiaoping dai",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643550",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a324a2bdf70a6b4b2c248a",
      "accountName": "A y a School",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816505",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a324ab9e22550633c631d8",
      "accountName": "Refrigeracion Victoria",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816514",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a324af9e22550633c63244",
      "accountName": "ROTISERIA MANA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816520",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a32a8f9e22550633c638b9",
      "accountName": "Laura Home Decor plus",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00507PA643270",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a330c6967196d1d636d8d5",
      "accountName": "Juan  Carlos  Toscano",
      "apiProvider": "61f2d315162eda2be73c459e",
      "externalId": "005936270264",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 50,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 50,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a33109967196d1d636da81",
      "accountName": "PEDRO SEGUNDO ROJAS MEZA",
      "apiProvider": "61f2d315162eda2be73c459e",
      "externalId": "00056CL634352",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 50,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 50,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3764f9e22550633c6b71d",
      "accountName": "TALAVIÑA FRANCO KARIM JULIETTE",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00051PE643299",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a384629e22550633c6ce47",
      "accountName": "ToyoTrain Venezuela",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00507PA643702",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2e1bdf70a6b4b2cfb5e",
      "accountName": "Well Pilates",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816483",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2ee9e22550633c71622",
      "accountName": "Fertec Aberturas",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816508",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2f2bdf70a6b4b2cfc29",
      "accountName": "Gestor del Automotor Eduardo Perez",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816512",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2f69e22550633c716e1",
      "accountName": "Los Indios Montaje",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816513",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2fa9e22550633c7174e",
      "accountName": "LA CLEMENTINA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816519",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a2fe9e22550633c717cc",
      "accountName": "Técnica Estructural Lorena Razzetto",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816521",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a3029e22550633c71848",
      "accountName": "Visión Global SRL",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816524",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a3069e22550633c718bd",
      "accountName": "Jordana Fernandez",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816525",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3a30a9e22550633c71931",
      "accountName": "Paulina Muebles",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816527",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a3cce79e22550633c772e9",
      "accountName": "Caca & Deco",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816533",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a475ffbdf70a6b4b2e079d",
      "accountName": "Dr Jose Ignacio David",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816534",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a49e509e22550633c87232",
      "accountName": "Laura Lizeth Mancera Rodríguez",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643537",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a49fa2bdf70a6b4b2e596d",
      "accountName": "ESTETICA MARIA HAYDEE",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816501",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a49fa8bdf70a6b4b2e59d9",
      "accountName": "Carolina Pollak",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816504",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ad2c9e22550633c89346",
      "accountName": "JUAN DAVID OROZCO CALDERON",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643775",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca4fbdf70a6b4b2eac1c",
      "accountName": "Asesora Comercial Claudia Soledad Pires",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816507",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca549e22550633c8c83e",
      "accountName": "Estetica Mg Beauty Fresh",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816516",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca599e22550633c8c8ac",
      "accountName": "Go Demoliciones",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816517",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca5e9e22550633c8c918",
      "accountName": "Mujercitas Express",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816523",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca639e22550633c8c986",
      "accountName": "Casa Patagonia",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816529",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca699e22550633c8ca21",
      "accountName": "Byc Mali",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816530",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca6e9e22550633c8ca8d",
      "accountName": "Multieventos Bodoke",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816531",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca739e22550633c8caf9",
      "accountName": "Mis Delicias",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816532",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4ca78bdf70a6b4b2ead80",
      "accountName": "Maquineria Urkupiña",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816535",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4e1769e22550633c8fdf2",
      "accountName": "Santiago Adolfo Orellana Lopez",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643791",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4eff8bdf70a6b4b2f0f31",
      "accountName": "MARCELINO ENRIQUE VILLEGAS AGUILERA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643816",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4f3299e22550633c9351a",
      "accountName": "HERNANDEZ CORREA AIDA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO642447",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4f49dbdf70a6b4b2f1f6e",
      "accountName": "Auxilio 24 Hs",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816537",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a4f4a8bdf70a6b4b2f1fee",
      "accountName": "Cintia Indumentaria Deportiva",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816540",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a5c7379e22550633ca6902",
      "accountName": "Ojala Sleep Wear",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816511",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a5c73b9e22550633ca6978",
      "accountName": "Moda Urbana",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816518",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a5e96bbdf70a6b4b308383",
      "accountName": "COMERCIAL JKC SPA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL622017",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a5f01b9e22550633caa9d7",
      "accountName": "SERVIMAQUIGON SPA",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643878",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a5f165bdf70a6b4b30914b",
      "accountName": "Polirubro Fénix Esquel",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "0005422816538",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a60d12bdf70a6b4b30c92e",
      "accountName": "Raul Andres Vega Celis",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643796",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a61c3a9e22550633cb1031",
      "accountName": "GILBERTO ENRIQUE LEON CORTES",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643535",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a61e9b9e22550633cb151b",
      "accountName": "JULIO CESAR CONDORI CONDORI",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643443",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a6202cbdf70a6b4b30ec83",
      "accountName": "Protección Integral A&E Sas",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643777",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a62899bdf70a6b4b30fd47",
      "accountName": "ARO MOTORS SAS",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00057CO643784",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
  {
      "accountId": "68a62a09bdf70a6b4b3100d4",
      "accountName": "Santiago Kriman",
      "apiProvider": "6331d0e09660361198fdd08d",
      "externalId": "00056CL643912",
      "hasAutomode": false,
      "onboardingCurrentState": "",
      "active": true,
      "base": 500,
      "baseUsed": 0,
      "extra": 0,
      "totalAvailable": 500,
      "channels": [
          {
              "type": "whatsapp",
              "active": false
          },
          {
              "type": "web",
              "active": false
          }
      ]
  },
    ]
  },
  timestamp: "2025-08-21T13:45:32.180Z",
  path: "/lite/v1/analytics/business/base?startDate=2025-08-14&endDate=2025-08-15"
};

export const mockAccountsWithSessionsResponse: AccountsWithSessionsResponse = {
  success: true,
  message: "Operación exitosa",
  data: {
    accountsWithSessions: [
      {
        accountId: "5f85ebdefd99d70a89d05b18",
        accountName: "Physica ",
        sessionCount: 1243
      },
      {
        accountId: "64017a4c99bdcb6fc8584369",
        accountName: "Miami Sun Estética y Spa",
        sessionCount: 987
      },
      {
        accountId: "640176884caadaec67c74d9c",
        accountName: "Helados Eduardiko",
        sessionCount: 756
      },
      {
        accountId: "640166b499bdcb6fc8570953",
        accountName: "Geriátrico Residencia Nathaniel",
        sessionCount: 643
      },
      {
        accountId: "64012f484caadaec67c05a63",
        accountName: "BOTONERA LAVALLE",
        sessionCount: 521
      },
      {
        accountId: "6401676e99bdcb6fc85715ed",
        accountName: "Farmacia Popular",
        sessionCount: 498
      },
      {
        accountId: "640158b899bdcb6fc85588c3",
        accountName: "Itat - Ingenieria Tecnica de Alta Tension",
        sessionCount: 387
      },
      {
        accountId: "640165194caadaec67c62ca2",
        accountName: "FERRETERIA CORRIENTES",
        sessionCount: 342
      },
      {
        accountId: "64011ece4caadaec67be7d17",
        accountName: "Gaetano Sassano - Alta Costura",
        sessionCount: 289
      },
      {
        accountId: "640127284caadaec67bf67b3",
        accountName: "Flexograf SRL",
        sessionCount: 234
      },
      {
        accountId: "68a330c6967196d1d636d8d5",
        accountName: "Juan  Carlos  Toscano",
        sessionCount: 198
      },
      {
        accountId: "689f2fcabdf70a6b4b27da78",
        accountName: "Mariela Essen",
        sessionCount: 156
      },
      {
        accountId: "68a324a2bdf70a6b4b2c248a",
        accountName: "A y a School",
        sessionCount: 134
      },
      {
        accountId: "68a3a2e1bdf70a6b4b2cfb5e",
        accountName: "Well Pilates",
        sessionCount: 112
      },
      {
        accountId: "68a4ca4fbdf70a6b4b2eac1c",
        accountName: "Asesora Comercial Claudia Soledad Pires",
        sessionCount: 89
      }
    ]
  },
  timestamp: "2025-08-22T04:02:55.204Z",
  path: "/lite/v1/analytics/business/activity?startDate=2025-08-06&endDate=2025-08-13&timezoneOffset=-5"
};
