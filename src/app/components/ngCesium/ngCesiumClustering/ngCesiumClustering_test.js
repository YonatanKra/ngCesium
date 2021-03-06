'use strict';
describe('ngCesium Clustering module tests', function () {

    var setData = function setData(viewer, config) {
        config = options.extensionInstance.config = {
            defaultRadius: 100,
            dataSource: undefined,
            groups: [
                // standart
                {
                    name: 'group1',
                    color: '#654EA0',
                    property: {
                        name: 'type',
                        value: 'pizzeria'
                    }
                },
                // group value as a function
                {
                    name: 'group2',
                    color: '#111AE9',
                    property: {
                        name: 'type',
                        value: 'burgers bar'
                    }
                },
                // no color
                {
                    name: 'group3',
                    property: {
                        name: 'type',
                        value: 'group3'
                    }
                }
            ]
        };
        viewer = options.extensionInstance.ngCesiumInstance._viewer;
        // add entities - 5 groups, with 10 elements each for
        var i, j, entitySpecs = {};
        for (i = 0; i < config.groups.length; i++) {
            entitySpecs[config.groups[i].property.name] = config.groups[i].property.value;
            for (j = 0; j < 10; j++) {
                viewer.entities.add(entitySpecs);
            }
        }
    };

    var options = {
        extensionName: 'ngCesiumClustering',
        extensionConfig: {
            propertyInScope: 'cesiumConfig.clusterConfig',
            propertyContent: {
                groups: [
                    // standart
                    {
                        name: 'group1',
                        color: '#654EA0',
                        property: {
                            name: 'type',
                            value: 'pizzeria'
                        }
                    },
                    // group value as a function
                    {
                        name: 'group2',
                        color: '#111AE9',
                        property: {
                            name: 'type',
                            value: function (entity) {
                                return entity.position.x > 10;
                            }
                        }
                    },
                    // no color
                    {
                        name: 'group3',
                        property: {
                            name: 'type',
                            value: 'group3'
                        }
                    }

                ]
            }
        }
    };

    ngCesiumExtensionTest(options);

    describe('ngCesiumClustering directive tests', function () {

    });

    describe('ngCesiumClustering factory tests', function () {

        it('ngCesiumClustering should be in the cesium instance', function () {
            expect(options.isoScope.cesiumCtrl.cesiumDirective.cesiumInstance.cesiumClustering).toBeDefined();
        });

        describe('General methods', function(){
            describe('refreshConfig(config) tests', function () {
                var config = {
                    defaultRadius: 100,
                    dataSource: undefined,
                    groups: [
                        // standart
                        {
                            name: 'group1',
                            color: '#654EA0',
                            property: {
                                name: 'type',
                                value: 'pizzeria'
                            }
                        },
                        // group value as a function
                        {
                            name: 'group2',
                            color: '#111AE9',
                            property: {
                                name: 'type',
                                value: function (entity) {
                                    return entity.position.x > 10;
                                }
                            }
                        },
                        // no color
                        {
                            name: 'group3',
                            property: {
                                name: 'type',
                                value: 'group3'
                            }
                        }

                    ]
                };

                it('should call setConfig(config)', function () {
                    spyOn(options.extensionInstance, 'setConfig');
                    options.extensionInstance.refreshConfig(config);
                    expect(options.extensionInstance.setConfig).toHaveBeenCalledWith(config);
                });

                it('should call setGroups()', function () {
                    spyOn(options.extensionInstance, 'setGroups');
                    options.extensionInstance.refreshConfig(config);
                    expect(options.extensionInstance.setGroups).toHaveBeenCalled();
                });

                it('should call cluster()', function () {
                    spyOn(options.extensionInstance, 'cluster');
                    options.extensionInstance.refreshConfig(config);
                    expect(options.extensionInstance.cluster).toHaveBeenCalled();
                });
            });
        });

        describe('Clustering Methods', function(){
            describe('cluster() tests', function () {
                it('cluster should call clusterGroup for all existing groups', function () {
                    options.extensionInstance.groups = [1, 2];
                    spyOn(options.extensionInstance, 'clusterGroup').and.callFake(function(){
                        return true;
                    });
                    spyOn(options.extensionInstance, 'clearClusters').and.callFake(function(){
                        return true;
                    });
                    spyOn(options.extensionInstance, 'resetVisibility').and.callFake(function(){
                        return true;
                    });
                    options.extensionInstance.cluster();
                    expect(options.extensionInstance.clusterGroup).toHaveBeenCalledWith(1);
                    expect(options.extensionInstance.clusterGroup).toHaveBeenCalledWith(2);
                });

            });

            describe('clearClusters() tests', function(){
                // should call remove all entities

                // should clear the clusters
            });

            describe('removeAllEntitiesFromGroup() tests', function(){
                // should call remove all entities

                // should clear the clusters
            });

            describe('clusterGroup(group) tests', function () {
                var config, viewer;

                beforeEach(function(){
                    setData(viewer, config);
                });

                it('Should call addToCluster() 10 times and createCluster 0 times', function(){
                    var clusterInstance = jasmine.createSpyObj(options.extensionInstance, ['addToCluster', 'createCluster']);
                    spyOn(options.extensionInstance, 'addToCluster').and.callFake(function() {
                        return true;
                    });
                    spyOn(options.extensionInstance, 'createCluster').and.callFake(function() {
                        return true;
                    });
                    var group = options.extensionInstance.setGroups()[0];
                    options.extensionInstance.divideIntoGroups();
                    options.extensionInstance.clusterGroup(group);

                    expect(options.extensionInstance.addToCluster.calls.count()).toEqual(10);
                    expect(options.extensionInstance.createCluster.calls.count()).toEqual(0);
                });

                it('Should call addToCluster() 10 times and createCluster 9 times', function(){
                    // mock the functions inside

                    spyOn(options.extensionInstance, 'addToCluster').and.callFake(function() {
                        if (angular.isUndefined(this.shouldReturnFalse)){
                            this.shouldReturnFalse = true;
                            return true;
                        }
                        return false;

                    });
                    spyOn(options.extensionInstance, 'createCluster').and.callFake(function() {
                        return true;
                    });
                    var group = options.extensionInstance.setGroups()[0];
                    options.extensionInstance.divideIntoGroups();
                    options.extensionInstance.clusterGroup(group);

                    expect(options.extensionInstance.addToCluster.calls.count()).toEqual(10);
                    expect(options.extensionInstance.createCluster.calls.count()).toEqual(9);
                })
            });

            describe('addToCluster(clusterArr, entity) tests', function () {
                it('Should return false if entity does not belong to any cluster', function(){
                    spyOn(options.extensionInstance, 'getRadius').and.callFake(function() {
                        return 10;
                    });

                    spyOn(options.extensionInstance, 'isInRadius').and.callFake(function() {
                        return false;
                    });

                    expect(options.extensionInstance.addToCluster({show: true}, {clusters: [{entities: [], centerEntity: {show: true}, clusterArr: []}]})).toBeFalsy();

                });

                it('Should return true if entity belongs to a cluster', function(){
                    spyOn(options.extensionInstance, 'getRadius').and.callFake(function() {
                        return 10;
                    });

                    spyOn(options.extensionInstance, 'isInRadius').and.callFake(function() {
                        return true;
                    });

                    spyOn(options.extensionInstance, 'addPointToPolygoneArr').and.callFake(function() {
                        return true;
                    });

                    expect(options.extensionInstance.addToCluster({show: true}, {clusters: [{entities: [], centerEntity: {show: true}, clusterArr: []}]})).toBeTruthy();

                });

                describe('addPointToPolygoneArr(point, arr) tests', function(){
                    //TODO::fill this up
                });

            });

            describe('isInRadius(radius, entity, centerEntity) tests', function () {

                var entity, centerEntity, distance;
                var entities = new Cesium.EntityCollection();
                entity = entities.add({
                    position: new Cesium.Cartesian3.fromDegrees(0, 0)
                });
                centerEntity = entities.add({
                    position: new Cesium.Cartesian3.fromDegrees(0, 15)
                });
                distance = Cesium.Cartesian3.distance(entity.position.getValue(Cesium.JulianDate.now()), centerEntity.position.getValue(Cesium.JulianDate.now()));

                it('should return false when not in radius', function () {
                    var radius = distance - 1;
                    expect(options.extensionInstance.isInRadius(radius, entity, centerEntity)).toBeFalsy();
                });

                it('should return true when in radius', function () {
                    var radius = distance + 1;
                    expect(options.extensionInstance.isInRadius(radius, entity, centerEntity)).toBeTruthy();
                });
            });

            describe('createCluster(entity, groupData) tests', function(){
                //TODO::fill this up
            });
        });

        describe('Grouping methods', function(){
            describe('setGroups() tests', function () {

                var config, viewer;

                // set the data
                beforeEach(function () {
                    setData(viewer, config);
                });

                // clear data after an "it"
                afterEach(function () {
                    options.extensionInstance.ngCesiumInstance._viewer.entities.removeAll();
                    options.extensionInstance.groups.length = 0;
                });

                it('should return false if config does not exist', function () {
                    //TODO::when no config is sent or no group is defined, add all entities to one group
                    options.extensionInstance.config = undefined;
                    expect(options.extensionInstance.setGroups()).toBe(false);
                });

                it('should call createGroup()', function () {
                    spyOn(options.extensionInstance, 'createGroup');
                    options.extensionInstance.setGroups();
                    expect(options.extensionInstance.createGroup.calls.count()).toEqual(3);
                });

                it('should return the groups if success', function () {
                    var expectedOutcome = options.extensionInstance.setGroups();
                    expect(expectedOutcome.length).toBe(3);
                });
            });

            describe('divideIntoGroups() tests', function () {
                var config, viewer;

                // set the data
                beforeEach(function () {
                    setData(viewer, config);
                });

                it('should call setInGroup(entity)', function () {
                    spyOn(options.extensionInstance, 'setInGroup');
                    options.extensionInstance.setGroups(); //set the groups
                    options.extensionInstance.divideIntoGroups(); // divide
                    expect(options.extensionInstance.setInGroup.calls.count()).toEqual(30);
                });

            });

            describe('setInGroup(entity) tests', function () {
                //TODO::fill this up
                var config, viewer;

                // set the data
                beforeEach(function () {
                    setData(viewer, config);
                });

                afterEach(function () {
                    options.extensionInstance.ngCesiumInstance._viewer.entities.removeAll();
                });

                it('Should return -1 when there are no groups', function () {
                    options.extensionInstance.groups.length = 0;
                    expect(options.extensionInstance.setInGroup({type: 'pizzeria'})).toEqual(-1);
                });

                it('Should return -1 when entity does not belong anywhere', function () {
                    options.extensionInstance.setGroups(); // set the groups
                    expect(options.extensionInstance.setInGroup({type: 'no group like this'})).toEqual(-1);
                });

                it('should return group index 0 when sent an entity with group of index 0', function () {
                    options.extensionInstance.setGroups(); // set the groups
                    expect(options.extensionInstance.setInGroup({type: 'pizzeria'})).toEqual(0);
                });

            });
        });

        it('setConfig(config) should alter the config', function () {
            var config = {
                propertyInScope: 'cesiumConfig.clusterConfig',
                propertyContent: {
                    defaultRadius: 100,
                    dataSource: undefined,
                    groups: [
                        // standart
                        {
                            name: 'group1',
                            color: '#654EA0',
                            property: {
                                name: 'type',
                                value: 'pizzeria'
                            }
                        },
                        // group value as a function
                        {
                            name: 'group2',
                            color: '#111AE9',
                            property: {
                                name: 'type',
                                value: function (entity) {
                                    return entity.position.x > 10;
                                }
                            }
                        },
                        // no color
                        {
                            name: 'group3',
                            property: {
                                name: 'type',
                                value: 'group3'
                            }
                        }

                    ]
                }
            };
            options.extensionInstance.setConfig(config);
            expect(options.extensionInstance.config).toEqual(config);
        });

    })
    ;

    describe('ngCesiumClustering constant tests', function () {
        var clusteringConstans;
        beforeEach(inject(function (_cesiumClusteringConstants_) {
            clusteringConstans = _cesiumClusteringConstants_;
        }));

        describe('groupsColors tests', function () {
            var groupsColors;
            beforeEach(function () {
                groupsColors = clusteringConstans.groupsColors;
                groupsColors.current = 0;
            });

            it('pickColor should return the first color in the list', function () {
                var pickedColor = groupsColors.colorsList[0];
                expect(groupsColors.pickColor()).toEqual(pickedColor);
            });

            it('after choosing a color, the current should be 1', function () {
                groupsColors.pickColor();
                expect(groupsColors.current).toEqual(1);
            });

            it('after choosing a color when current is at max, the current should be 1 and the first color should be returned', function () {
                var expectedPickedColor = groupsColors.colorsList[0];
                groupsColors.current = groupsColors.colorsList.length;
                expect(groupsColors.pickColor()).toEqual(expectedPickedColor);
                expect(groupsColors.current).toEqual(1);
            });
        });


    });

    describe('cesiumClusteringGroup tests', function () {
        var cesiumClusteringGroup;
        var config = {
            defaultRadius: 100,
            dataSource: undefined,
            groups: [
                // standart
                {
                    name: 'group1',
                    color: '#654EA0',
                    property: {
                        name: 'type',
                        value: 'pizzeria'
                    }
                },
                // group value as a function
                {
                    name: 'group2',
                    color: '#111AE9',
                    property: {
                        name: 'type',
                        value: function (entity) {
                            return entity.position.x > 10;
                        }
                    }
                },
                // no color
                {
                    name: 'group3',
                    property: {
                        name: 'type',
                        value: 'group3'
                    }
                }

            ]

        };
        var result;
        beforeEach(inject(function (_cesiumClusteringGroup_) {
            cesiumClusteringGroup = _cesiumClusteringGroup_;
            result = new cesiumClusteringGroup(config.groups[0], config, {add: function(){return  {id: Math.random()}}});
        }));

        describe('should create a group instance', function () {

            it('should set the name according to group name', function () {
                expect(result.name).toEqual('group1');
            });

            it('should set the color according to group color', function () {
                expect(result.color).toEqual('#654EA0');
            });

            it('should set a random id', function () {
                expect(result.id).toBeDefined();
            });

            it('should set a data source', function () {
                expect(result.dataSource).toBeDefined();
            });

            it('should set the radius according to defaults', function () {
                expect(result.radius).toEqual(100);
            });

            it('should set the radius according to group radius', function () {
                config.groups[0].radius = 50;
                result = new cesiumClusteringGroup(config.groups[0], config, {add: function(){return  {id: Math.random()}}});
                expect(result.radius).toEqual(50);
            });


        })

    });
})
;