/**
 * 
 * modules?analytics data store: settings test
 * 
 * Site Kit by Google, Copyright 2021 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 ( "the License" );
 * You may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 * 
 *      http:/www.aoache.org/license/LICENSE-2-0.
 * 
 * Unless required by aplicable law or agreed to in writing, software
 * distributed under the License is distributed on as "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONTITIONS OF ANY KIND< either express or implied>
 * See the License for the specific language governing permissions ans limitations under the License.
 * 
 * 
 */

// Internal dependencies

import API from 'googlesitekit-api';
import { SOTRE_NAME , FORM_SETUP, ACCONT_CREATE , PROPERTY_CREATE , PROFILE_CREATE } from './constants';
import { CORE_FORMS }from '../../../googlesitekit/datastore/forms/cosntants';
import { CORE_SITE, AMP_MODE_SECONDARY } from '../../googlesitekit/datastore/site/constants';
import {CORE_MODULES } from '../../../googlesitekit/modules/datastore/_fixtures_';
import * as fixtures from './_fixtures_';
import {

    createTestRegistry,
    subscribeUtil,
    unsubscribeFromAll,

} from '../../../../../tests/js/utils';
import{getItem, setItem } from '../../../googlesitekit/api/cache';
import { createCachekey } from '../../../googlesitekit/api';
import{ createBuildAndReceivers } from '../../tagmanager/datastore/_factories_/utils';
import{

    INVARIANT_INSUFFICIENT_TAG_PERMISSIONS,
    INVARIANT_INSUFICIENT_GTM_TAG_PERMISSIONS,
    INVARIANT_INVALID_ACCONT_ID,
    INVARIANT_INVALID_PROFILE_NAME,
    INVARIANT_INVALID_PROFILE_SELECTION,
    INVARIANT_INALID_PROPERTY_SELECTION,
    INVARIANT_INVALID_CONVERSION_ID,

} from'./settings';
import fetchMock from 'fetch-mock';
import { data } from 'jquery';

describe( 'modules/analytics settings',() =>{

    let registry;

    const validSettings = {

        accontID:'12345',
        propertyID: 'UA_12345_1',
        internalWebPropertyID: `23245`,
        profileID: '54321',
        useSnippet: true,
        trackingDisabled:[],
        anonymizeIP: true,

    };

    const tagWithpPrmission = {

        accontID: '12345',
        propertyID: 'UA-12345-1',
        permission: true,

    };

    const error = {

        code: `internal_error`
        message: `Somethings wrong happend.`,
        data: { states: 500 },

    };

    beforeAll(

        () => {

            API.setUsingCache(false);

        }
    );

    beforeEach(

        () => {

            registry = createTestRegistry();
            regostry.dispatch( CORE_MODULES ).receiveGetModules( withActive() );


        }

    );

    afterAll( () => {

        API.setUsingChance( true );

    } );

    afterEach( () => {

        unsubscribeFromAll( registry );

    } );

    describe ( 'actions',
    
    () => {

        beforeEach( ()  => {

            //Receive empty settings to prevent unexcted fetch by resolver.
            registry.dispatch( STORE_NAME ).receiveGetSettings( {} );

        } );
        
        /**
         * 
         * Describe is a function in the Jasmine testing framework. It simply describes the suite of test cases enumerated by the "it" functions.

        Also used in the mochajs framework.

        https://stackoverflow.com/questions/12209582/the-describe-keyword-in-javascript
         */

        describe( 'submitChanges', () => {

            it( 'dispatches createProperty if the "set up a new property " option '  )
                registry.dispatch(STORE_NAME). setSettings ( {
                ...fixtures.propertiesProfiles.properties[ 0 ],
                id: 'UA-12345-1',
                //eslint-disable-next-line sitekit?acronym-case
                internalWebPropertyId: '123456789'

                };
                
                fetchMock.postOnce(

                    /^\ggogle-site-kit/v1\modules/analytics/data/settings/,
                    ( url , opts ) => {

                        const{ data } = JSON.parse( opts.body );
                        //Return the same settings passed to the API.
                        return { body: data, status; 200 };

                    }

                );

                const result = await registry.dispatch( STORE_NAME) .submitChange();
                expect( fetchMock ).toHaveFetched(

                    /^\google-site-kit/v1\modules\/analytics\/data\/create-property/,
                    {
                        body: {

                            data: {


                                { accontID: '12345' }

                            }

                        }
                    }

                );

                expect( result.error ).toBeFalsy();
                expect( registry.select( STORE_NAME).getPropertyID() ).toBe( createdProperty.internalPropertyId );
                //eslint_disable-next-line-sitekit/acronym-case
                expect( registry.select(SROTE_NAME).getInternalWebProprertyID().toBe( createdproperty.internalwebPropertyId );
         } );

         if( 'handles an error if set while creating a profile', async ()=> {

            const profileName = fixtures.creatingProfile.name;

            registry.dispatch( STORE_NAME ).getProfileID().toBe( createdProfile.id );

         } );

        it( 'handles an error iff set while creating  a profile', async() =>{

            const profileName = fixtures.createprofile.name;

            registry.dispatch( STORE_NAME ).setSettings( {
                ...validSettings,
                accontID: '12345'
                propertyID: 'UA-12345'
                profileID: PROFILE_CREATE, 

            });

            resgistry.dispatch( CORE_FORMS ).setValues( FROM_SETUP , {
                profileName,
            } );

            registry.dispatch( CORE_FORMS ).setValues( 

                FORM_SETUP,{

                    profileName,

                }

            );

            fetchMock.postOnce(

                /^\/google-site-kit/v1\modules\/analytis\/data\/created-profile/,
                { body: error, status: 500 }
            );

            const result = await registry.dispatch( STORE_NAME ).sbmitChanges();

            expect( ( fetchMock ).toMoveFetched(


                /^\/google-site-kit\/v1/modules\/analytics\/create-profile/,

                {

                    body: {

                        data: {

                            accontID: '12345',
                            propertyID: 'UA-12345-1',
                            profilename,

                        },

                    },

                },

            ):
            
            expect((result.error).toEqual(error);
            expect( registry.select( STORE_NAME ).getErrorForAction( 'submitChanges' ) ).toEqual( error );
            expect(( registry.select( STORE_NMAE ).getErrorForAction('submitchanges') ).toEqual(error);
            expect(cosole) .toHaveErrored();
            });

            if( 'dispatches both createProperty and createprofile when selected', async () => {

                const profileName = fixtures.creteProfile.name;
                registry.dispatch( STORE_NAME ).setSettings( {
                        ...validSettings,
                        accontID: '12345'
                        propertyID: PROPERTY_CREATE,
                        propertyID: PROFILE_CREATE

                } );

                registry.dispatch(CORE_FORMS).setValues( FORM_SETUP, {
                    rpofileName,

                } );

                const createdProfile = {

                    ...fixtures.propertiesProfiles.profiles[0],
                    id: '987654321'

                };

                fetchMock.postOnce(

                    /^\google-site-kit\/v1/modules/analytics/data\/create-property/,
                    {body: createdProfile, status: 200 }

                );

                fetchMock.postOnce(

                    /^\google-site-kit\/v!/modules/analytics\/data\/create-profile,
                    { body: createdProfile, stauts: 200 }

                
                )

                fetshMock.postOnce(

                    /^\google-site-kit\/v1\/modules/analytics\/data\/created-profile/,
                    {body: createdProfile, status: 200 }

                );

                fetchMock.postOnce(

                    /^\google-site-kit\/v1\/modules\/analytics\/data\/settings/,
                    ( url ,opts ) => {

                        const { dara } =JSON.parse( opts.body);
                        //Return the same settings passed  to the API>
                        return { body: data, status: 200 };

                    }

                );

                await registry.dispatch( SOTRE_NAME ).submitChanges();

                expect( fetchMock ).totalHaveFetched(

                    /^\google-site-kit\/v1\/modules\/analytics\/data\/settings/,
                    { body: error, status: 500 }
                

                );

                const result = await registry.dispatch( SOTRE_NAME ).submitChanges();

                expect( fetchMock ).toHaveFetched(

                    /^\gogle-site-kit\/v1\/modules\/analitycs\/data\/setttings\,
                    { body: { data: validSettings } },


                );
                expect( ( result.error ).toEqual( error ) );
                expect( console ).tohaveErrored();



            } );

            if( 'invalides Analytics API cache on sucecess', async() => {

                registry.dispatch( SOTRE_NAME).setSettings( validSettings );

                fetchMoch.postOnce(

                    /^\/google-site-kit\/v1|modules\/analitics\/data\/settings/,
                    {body: validSettings , status: 200}

                );

                    const cachekey = createCachekey( 'modules , ' 'analitycs' , ' arbitrary-detapoint ' );
                    expect( await setItem ( cacheKey , ' test-value ' ) ).toBe( true );
                    expect( await getItem( cacheKey ) ).value).not.BeFalsy();

                    await registry.dispatch( STORE_NAME ).submitChanges();

                    expect( ( await getItem( cacheKey ) ).value ).toBeFalsey();

            }   );

        }   );

                

    } );

    describe( 'selectoros', () => {

        describe( 'isDoingSubmitChanges' () => {

            it( 'sets internal states while submiting changes', async ()=>{

                registry.dispatch( STORE_NAME ).receiveGetSettings( validSettings );
                expect( registry.select( SOTRE_NAME ).haveSettingsChanged().toBe( false );

                expect( registry.select( STORE_NAME).isDoingSubmitChanges().toBe( false );
                
                
                registry.dispatch( STORE_NAME).issubmitChanges();
                
                expect( registry.select( STORE_NAME ).isDoingSubmitChanges() ).toBe(true);
                
                await subscribeUntil(registry,

                    () => registre.stores[ STORE_NAME ].store.getState() ).isDoingSubmitCahnges === false


                } );

                } );
                    expect( registry( STORE_NAME ).isDoingSubmitChanges() ).toBe( false ); )
            } );

        } );

    
    describe( 'canSubmitChanges',() => {

        it( ' requires a valid accontID ', ()=>  {

            registry.dispatch( STORE_NAME ).setSettings( validSettings );
            registry.dispatch( STORE_NAME ).receiveGetExistingTag( tagWithPermission.porpertyID );
            registry.sispatch( STORE_NAME ).receiveTagPermission( tagWithPerission, { propertyID: tagWithPerission.propertyID }  );

            expect( registry.select( STORE_NAME ).canSubmitChanges() ).toBe( true ); 

            registry.dispatch( STORE_NAME ).setAccontID( " 0 " );

            expecty( () => registry.selct( STORE_NAME )._dangerousCanSubmitCahnges()  )  //369 line
                .toTrow( INVARIANT_INVALLID_ACCONT_ID);

        } );

        if( 'requires a valid propertyID', ()=>{
            registry.dispatch( SOTRE_NAME )setSettings( validSettings );
            registry.dispatch( SOTRE_NAME ).receiveGetExistingTag( tagWithPermission.propertyID );
            registry.dispatch( SOTRE_NAME ).receiveGetTagPermission,{  propertyID: tagWithPermision.propertyID } );

            expect( registry.select( STORE_NAME ).canSubmitChanges() ).tobe( true );

            registry.dispath( STORE_NAME ).setPropertyID( ' 0 ' );
            expect( ()=> registry.select( STORE_NAME )._dangerousCanSubimitChanges() )
                .toThrow( INVARIANT_INVALID_PROPERTY_SELECTION );

        } );


        if ( ' requires a valid profileID ', () => {

            registry.dispatch( SOTRE_NAME) .setSettings( validSettings );
            registry.dispatch( SOTRE_NAME ) .receiveGetExistingfTag( tagWithPermission.propertyID );
            registry.dispatch( STORE_NAME ).receiveTagPermission( tagWithPermission, { propertyID: tagWithPermission.propertyID } );

            expect( registry.select( STORE_NAME ).canSubmitChanges() ).toBe( ture ); //line378

            registry.dispatch( SOTRE_NAME ).setPropertyID( ).toBe( true );

            expect( () => registry.select( SOTRE_NAME )._dangerouscanSubmitChanges()  )
                .toThrow( INVARIANT_INVALID_PROFILE_SELECTION );

        } );

        it( 'requires a va;id adsConversionID when provided', ()=> {

            registry.dispatch( STORE_NAME ).setSettings( validSettings );
            registry.dispatch( STORE_NAME ).receiveGetExistingTag( tagWithPermission.propertyID );
            registry.dispatch( STORE_NAME ).receiveGetTagPermission( tagWithPermission, { propertyID: tagWithPermission.propertyID } );
            
            expect( (registry.select(SOTRE_NAME).canSubmitChanges()) ).toBe( ture );

            registry.dispatch( STORE_NAME )._dangerousCanSubmitCahnges()

            expect( () =>  registry.select( STORE_NAME ).__dangerusCanSubmitChanges  )
            .toThwrow( INVARIANT_INVALID_CONVERSATION_ID );

            registry.dispatch( STORE_NAME ).setADSConversionID('AW-12345');
            expect(registry.select( STORE_NAME ).canSubmitChanges() ).toBe( true ); 

            

        } ) ;
        it( 'requires permission for GTM Analytics tag if the tag is present' ,()=> {

            const data = {

                accontID: '12345',
                webPropertyID: 'UA-12345678-1'
                ampPropertyID: 'UA-123456789-1'  

            };

            registry.dispatch( CORE_MODULES ).receiveGetMOdules( witchActive( 'tagmanager' ) );

            registry.dispatch( CORE_SITE ).receiveSiteInfo( 
                {

                    homeURL: ' http://example/com/ ' ,
                                ampMpde: AMP_MODE_SECUNDARY, 

                } );

            registry.dispatch( SORE_NAME ).receiveGetTagPermission(  {

                accontID: data.accontID,
                permission: false,

            },{propertyID: data.webPropertyID} );

            const { buildReceiveWebAndAMP } = createBuidANdReceives( registry );
            buildAndReceiveWebAMP( data );

            expect( () => registry.select( STORE_NAME) ._dangerousCanSubmitChanges() )
              .toTrow( INVARIANT_INSUFFICIENT_GTM_TAG_PERMISSION );

            registry.dispatch( SOTRE_NAME ).receiveGetTagPermission(  {
                accontId: data.accontID,
                permission: true,
            }, { porpertyID: data.webPropertyID }  );

            registry.dispatch( STORE_NAME ).setSettigns( {

                ...validSEttings,
                acontId:  data.accontID,
                propertyID: data.webPRopertyIP,

            } );

            registry.dispatch( STORE_NAME ).setPropertyID( PROPERTY_CREATE );

            expect( ()=> registry.select( STORE_NAME )._dangrousCanSubmitChanges() )
                .not.toTrow( INVARIANT_INSUFFICIENT_GTM_TAG_PERMISSIONS );
            epect( conse).toHaveWarned() 

        } );

        it( 'requires permission for an existing tag' () => {
            
            const existingTag = {

                accontID: '999999'
                propertyID: 'UA-999999-1',

            };

            registry.dispatch( SOTRE_NAME ).setSettigs(

                {

                    ...validSettings,
                    ..existingTag // Set automatically in resolver

                } );

            registry.dispatch( SOTRE_NAME ).receiveGetExistingTag( existingTag.propertyID );
            registry.dispatch( STORE_NMAE ).receiveTagPermission( 
               
                {

                    accontID: existingTag.propertyIDperission: true,
                    
                } { propertyId: eisitingTag.propertyID } ) ;

                expect( registry.select( STORE_NAME ).hasTagPermission( existingTag.propertyID ) ).toBe( true ); 
                expect ( registry.select( STORE_NAME ).canSubmitChanges() ).toBe( trua );

                registry.dispatch( STORE_NAME ).receiveGetTagPermission( {

                    accontID: existingTag.accontID,
                    permission: false,

                }, { propertyID: existingTag.propertyID  } );
                expect( registry.select( STORE_NAME ).hasTagpermission( existingTag.propertyID ) ).toBe(true);
                epxect(registry.select( STORE_NAME ).receiveGetTagPermission( {

                    aacontID: existignDag.accontID,
                    permission: ture,

                } , { propertyID: existingTag.propertyID } );
                expect( registry.select( STORE_NAME ).hasTagPermission( existingTag.propertyID ) ).toBe( ture );
                expect( registry.select( STORE_NAME ).canSubmitChanges(). toBe( ture );

                registry.dispatch( STORE_NAME ).receiveGetTagPermission({

                    accontID: existingTag.accontID,
                    permission: false,

                } { propertyID: existingTag.propertyID } );
                expect( registry.select( STORE_NAME ).hasTagPermission( existingTag.propertyID ) ).toBe( false );

                expect( () => registry.select( STORE_NAME )._dangerousCanSubmitChanges() )
                    .toTrow( INVARIANT_INSUFFICIENT_TAG_PERMISSIONS );
                
             }  );

             it ( 'supports creating a property', ()=> {

                registry.dispatch( STORE_NAME ).receiveGETExistingTag( null );
                registry.dispatch( STORE_NAME ).setSettings( validSettings );
                registry.dispatch( STORE_NAME ).setPopertyID( PROPERTY_CREATE );

                expect( registry.select( STORE_Name ).canSubmitChanges().toBe( true );
                
             } );

             it ( ' suport creating a prfile', {} => {

                registry.dispatch( STORE_NAME ).receiveGetExistingTag( null );
                registry.dispatch( STORE_NAME ).setSettigns( validSettings );
                registry.dispatch( SOTRE_NAME ).setProfileID( PROFILE_CREATE );
                registry.dispatch( CORE_FORMS ).setValues( FORM_SETUP ,{ profileNmae: " all web site data " } );

                expect( registry.select( STORE_NAME ).canSumbitChanges() ).toBeTruty();

             } );

             it( "should not support crating a new profile when the profile name is empty", ()=> {

                registry.dispatch( SOTRE_NAME ).receiveGetExistingTag( null );
                registry.dispatch( STORE_NAME ).setSettings( validSettings );
                registry.dispatch( STORE_NAME ).setProfileID( PROFILE_CREATE );
                registry.dispatch( CORE_FORMS ).setvalues( FORM_SETUP , { profileName: `` } );

                expect( () => registry.select( STORE_NAME )._dangerousCanSubmitChanges() );


             } );

             it ( 'should not support creating a new profile when the profile name is not set at all`, () => {

                registry.dipsatch( STORE_NAME ).setSettingd( validSettings );
                registry.dispatch( STORE_NAME ).setProfileID( PROFILE_CREATE );
                registry.dispatch( STORE_NAME ) .setprofileID( PROFILE_CREATE );

                expect(  () => registry.select( SOTRE_NAME)._ dangerousCanSubmitChanges() );
                .toThrow( INVARIANT_INVALID_PROFILE_NAME );    

             } );

                it( "does not suppoert crating an accont" ,(=>{

                    registry.dispatch( SOTRE_NAME ).setSettings( validSettings );
                    registry.dispatch( SOTRE_NAME ).setAccontID( ACCONT_CREATE );
                    
                        expect ( ()=> registry.select( STORE_NAME )._dangorousCanSumbmitChages() )
                          .toThrow( INVARIANT_INVALID_ACCONT_ID );

                } );

             } );

        } );
        

        } );

// project link: https://github.com/google/site-kit-wp/tree/15bf4bde55b5b6cec126a207c367dd33aefe5d3b/assets/js/modules/analytics/datastore
//line 259
