package gcloud

import (
	"context"
	"log"
	"time"

	"cloud.google.com/go/datastore"
)

const (
	projectKey string = "Calculation"
	projectID  string = "calculatorwebapp-253804"
)

type Datastore struct {
	ctx      context.Context
	dsClient *datastore.Client
}

func (d *Datastore) initClient() {
	d.ctx = context.Background()
	if d.dsClient == nil {
		client, err := datastore.NewClient(d.ctx, projectID)
		if err != nil {
			log.Println(err)
			log.Fatal("failed to create datastore client")
		}
		d.dsClient = client
	}
}

type Calculation struct {
	Calculation string
	TimeAdded   time.Time
}

func (d *Datastore) GetLastTenCalculations() (*[]Calculation, bool) {
	if d.dsClient == nil {
		d.initClient()
	}
	var calculations *[]Calculation
	query := datastore.NewQuery(projectKey).Order("-TimeAdded").Limit(10)
	if _, err := d.dsClient.GetAll(d.ctx, query, &calculations); err != nil {
		log.Println("failed to get last 10 Calculations")
		log.Println(err)
		return calculations, false
	}
	return calculations, true
}

func (d *Datastore) SaveCalculation(calculation Calculation) {
	if d.dsClient == nil {
		d.initClient()
	}
	key := datastore.IncompleteKey(projectKey, nil)
	if _, err := d.dsClient.Put(d.ctx, key, &calculation); err != nil {
		log.Println("failed to save Calculation")
		log.Println(err)
	}
	log.Println("saved Calculation")
}
